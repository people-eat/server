import bcrypt from 'bcryptjs';
import { createWriteStream } from 'fs';
import moment from 'moment';
import { join } from 'path';
import { type Authorization, type GlobalBookingRequestPriceClassType } from '../../..';
import { type DBAllergy, type DBCategory, type DBEmailAddressUpdate, type DBKitchen, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOneCook } from '../../cook/useCases/createOne';
import { createOne as createOneEmailAddressUpdate } from '../../email-address-update/useCases/createOne';
import { createOneWithoutConfirmationEmail } from '../../email-address-update/useCases/createOneWithoutConfirmationEmail';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/useCases/createOne';
import { routeBuilders } from '../../routeBuilder';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneUserRequest } from '../CreateOneUserRequest';

interface CreateOneUserSuccessResult {
    succeeded: true;
}

interface CreateOneUserFailedResult {
    failed: true;
}

interface CreateOneUserFailedAlreadyExistsResult {
    alreadyExists: true;
}

export type CreateOneUserResult = CreateOneUserSuccessResult | CreateOneUserFailedResult | CreateOneUserFailedAlreadyExistsResult;

export interface CreateOneUserByEmailAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneUserRequest;
}

const priceClassTitles: Record<GlobalBookingRequestPriceClassType, string> = Object.freeze({
    ['SIMPLE']: 'Einfaches Menü: 70.00 - 90.00 EUR',
    ['FINE']: 'Fine-Dining Menü: 90.00 - 130.00 EUR',
    ['GOURMET']: 'Gourmet Menü: ab 130.00 EUR',
});

// eslint-disable-next-line max-statements
export async function createOne({ runtime, context, request }: CreateOneUserByEmailAddressInput): Promise<CreateOneUserResult> {
    const { dataSourceAdapter, emailAdapter, klaviyoEmailAdapter, smsAdapter, logger, serverUrl, webAppUrl } = runtime;
    const {
        emailAddress,
        phoneNumber,
        password,
        firstName,
        lastName,
        language,
        gender,
        birthDate,
        cook,
        addresses,
        profilePicture,
        globalBookingRequest,
    } = request;

    const existingUserByEmailAddress: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress });
    const existingEmailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (existingUserByEmailAddress || existingEmailAddressUpdate) {
        logger.info(
            `Failed to create a new user because of duplicate data: ${JSON.stringify({
                existingUserByEmailAddress,
                existingEmailAddressUpdate,
            })}`,
        );
        return { alreadyExists: true };
    }

    const userId: NanoId = createNanoId();

    // STEP - profile picture
    let profilePictureUrl: string | undefined;

    if (profilePicture) {
        // store different sizes right away
        const profilePictureId: NanoId = createNanoId();
        profilePictureUrl = serverUrl + '/profile-pictures/' + profilePictureId;
        const profilePictureSuccess: boolean = await new Promise<boolean>(
            (resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
                profilePicture
                    .pipe(createWriteStream(join(process.cwd(), `images/profile-pictures/original/${profilePictureId}.png`)))
                    .on('finish', () => resolve(true))
                    .on('error', () => reject(false)),
        );
        if (!profilePictureSuccess) logger.info(`createOneUser - failed to persist profile picture for user ${userId}`);
    }

    // STEP - user
    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: undefined,
        password: password ? bcrypt.hashSync(password, bcrypt.genSaltSync()) : undefined,
        failedSignInAttempts: 0,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language,
        gender,
        birthDate,
        profilePictureUrl,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) {
        logger.warn('Persisting user did fail');
        return { failed: true };
    }

    // STEP - set current request to signed in state
    // maybe only use this line to get rid of all the userCreation flags. Will be unset after request is handled
    // const { sessionId } = context;
    // await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });
    context.userId = userId;

    // STEP - email address confirmation
    let confirmEmailAddressUrl: string | undefined;

    // a bit ugly to have this here, but it works
    const globalBookingRequestId: NanoId = createNanoId();

    if (globalBookingRequest) {
        const emailSuccess: { confirmEmailAddressUrl: string } | undefined = await createOneWithoutConfirmationEmail({
            runtime,
            context,
            request: {
                userId,
                emailAddress: emailAddress.trim(),
                returnTo: routeBuilders.profileGlobalBookingRequest({ globalBookingRequestId }),
            },
        });

        if (!emailSuccess) {
            logger.error('Could not create email address update');
            return { failed: true };
        }

        confirmEmailAddressUrl = emailSuccess.confirmEmailAddressUrl;
    } else {
        const emailSuccess: boolean = await createOneEmailAddressUpdate({
            runtime,
            context,
            request: { userId, emailAddress: emailAddress.trim() },
        });

        if (!emailSuccess) {
            logger.error('Could not create email address update');
            return { failed: true };
        }
    }

    // STEP - phone number
    const smsSuccess: boolean = await createOnePhoneNumberUpdate({
        dataSourceAdapter,
        smsAdapter,
        logger,
        webAppUrl,
        context,
        request: { userId, phoneNumber: phoneNumber.trim() },
    });

    if (!smsSuccess) logger.error('Could not create phone number update');
    // return { failed: true };

    // STEP - addresses
    if (addresses) for (const address of addresses) await createOneAddress({ runtime, context, request: { userId, ...address } });

    // STEP - cook
    if (cook) await createOneCook({ runtime, context, request: { cookId: userId, ...cook } });

    // STEP - booking request
    if (globalBookingRequest) {
        const globalBookingRequestSuccess: boolean = await dataSourceAdapter.globalBookingRequestRepository.insertOne({
            globalBookingRequestId,
            userId,
            adultParticipants: globalBookingRequest.adultParticipants,
            children: globalBookingRequest.children,
            priceClassType: globalBookingRequest.priceClassType,
            dateTime: globalBookingRequest.dateTime,
            duration: globalBookingRequest.duration,
            occasion: globalBookingRequest.occasion.trim(),
            message: globalBookingRequest.message.trim(),
            kitchenId: globalBookingRequest.kitchenId,
            latitude: globalBookingRequest.location.latitude,
            longitude: globalBookingRequest.location.longitude,
            locationText: globalBookingRequest.location.text ?? '',
            expiresAt: moment().add(14, 'days').toDate(),
            createdAt: new Date(),
        });

        if (!globalBookingRequestSuccess) return { failed: true };

        let kitchen: DBKitchen | undefined;

        if (globalBookingRequest.kitchenId)
            kitchen = await dataSourceAdapter.kitchenRepository.findOne({ kitchenId: globalBookingRequest.kitchenId });

        const allergies: DBAllergy[] = [];

        if (globalBookingRequest.allergyIds) {
            for (const allergyId of globalBookingRequest.allergyIds) {
                const allergy: DBAllergy | undefined = await dataSourceAdapter.allergyRepository.findOne({ allergyId });
                // eslint-disable-next-line max-depth
                if (allergy) allergies.push(allergy);
            }
        }

        const allergyTitles: string[] = allergies.map(({ title }: DBAllergy) => title);

        const categories: DBCategory[] = [];

        if (globalBookingRequest.categoryIds) {
            for (const categoryId of globalBookingRequest.categoryIds) {
                const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({ categoryId });
                // eslint-disable-next-line max-depth
                if (category) categories.push(category);
            }
        }

        const categoryTitles: string[] = categories.map(({ title }: DBCategory) => title);

        const formattedDateTime: string = moment(globalBookingRequest.dateTime).format('MMMM Do YYYY, h:mm a');

        await klaviyoEmailAdapter.sendGlobalBookingRequestWithEmailConfirmation({
            recipient: {
                userId,
                firstName,
                lastName,
                emailAddress,
            },
            data: {
                globalBookingRequestId,
                totalParticipants: globalBookingRequest.adultParticipants + globalBookingRequest.children,
                adults: globalBookingRequest.adultParticipants,
                children: globalBookingRequest.children,
                priceClassTypeLabel: priceClassTitles[globalBookingRequest.priceClassType],
                timeLabel: moment(globalBookingRequest.dateTime).format('LT'),
                dateLabel: globalBookingRequest.dateTime.toDateString(),
                locationText: globalBookingRequest.location.text ?? '',
                occasion: globalBookingRequest.occasion,
                message: globalBookingRequest.message,
                confirmEmailAddressUrl:
                    confirmEmailAddressUrl ?? webAppUrl + routeBuilders.profileGlobalBookingRequest({ globalBookingRequestId }),
            },
        });

        const globalBookingRequestEmailSuccess: boolean = await emailAdapter.sendToMany(
            'Booking Request',
            runtime.notificationEmailAddresses,
            `from ${firstName} ${lastName}`,
            `A new Booking Request was received from <b>${firstName} ${lastName}</b><br/><br/><b>When:</b> ${formattedDateTime}<br/><b>Where:</b> ${
                globalBookingRequest.location.text
            }<br/><b>Occasion:</b> ${globalBookingRequest.occasion}<br/><br/><b>Adults:</b> ${
                globalBookingRequest.adultParticipants
            }<br/><b>Children:</b> ${globalBookingRequest.children}<br/><br/><b>Budget:</b> ${
                globalBookingRequest.priceClassType
            }<br/><br/><b>Message:</b><br/>${
                globalBookingRequest.message
            }<br/><br/><br/><b>Contact:</b><br/>Email Address: ${emailAddress}<br/>Phone Number: -<br/><br/>Kitchen: ${
                kitchen?.title ?? 'any'
            }<br/><br/>Allergies: ${allergyTitles.join(', ')}<br/><br/>Categories: ${categoryTitles.join(', ')}`,
        );

        if (!globalBookingRequestEmailSuccess) return { failed: true };
    }

    return { succeeded: true };
}
