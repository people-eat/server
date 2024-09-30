import { globalBookingRequestCustomerConfirmation, welcome } from '@people-eat/server-adapter-email-template';
import bcrypt from 'bcryptjs';
import { createWriteStream } from 'fs';
import moment from 'moment';
import { join } from 'path';
import { type Authorization } from '../../..';
import { type DBAllergy, type DBCategory, type DBEmailAddressUpdate, type DBKitchen, type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOneCook } from '../../cook/useCases/createOne';
import { createOne as createOneEmailAddressUpdate } from '../../email-address-update/useCases/createOne';
import { createOne as createOnePhoneNumberUpdate } from '../../phone-number-update/useCases/createOne';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneUserByEmailAddressRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByEmailAddressInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneUserByEmailAddressRequest;
}

// eslint-disable-next-line max-statements
export async function createOneByEmailAddress({ runtime, context, request }: CreateOneUserByEmailAddressInput): Promise<boolean> {
    const { dataSourceAdapter, emailAdapter, smsAdapter, logger, serverUrl, webAppUrl } = runtime;
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

    if (!emailAddress && !phoneNumber) {
        logger.error('Received create user request with neither email address not phone number');
        return false;
    }

    let userId: NanoId = createNanoId();

    const existingUserByEmailAddress: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ emailAddress });
    const existingUserByPhoneNumber: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ phoneNumber });
    const existingEmailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });
    const existingPhoneNumberUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (!existingUserByEmailAddress && !existingUserByPhoneNumber && !existingEmailAddressUpdate && !existingPhoneNumberUpdate) {
        let profilePictureUrl: string | undefined;

        if (profilePicture) {
            // store different sizes right away
            const profilePictureId: NanoId = createNanoId();
            profilePictureUrl = serverUrl + '/profile-pictures/' + profilePictureId;
            await new Promise<boolean>((resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
                profilePicture
                    .pipe(createWriteStream(join(process.cwd(), `images/profile-pictures/original/${profilePictureId}.png`)))
                    .on('finish', () => resolve(true))
                    .on('error', () => reject(false)),
            );
        }

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
            return false;
        }

        // const { sessionId } = context;

        // await dataSourceAdapter.sessionRepository.updateOne({ sessionId }, { userId });

        // maybe only use this line to get rif of all the userCreation flags. Will be unset after request is handled
        context.userId = userId;

        if (emailAddress) {
            const emailSuccess: boolean = await createOneEmailAddressUpdate({
                runtime,
                context,
                request: { userId, emailAddress: emailAddress.trim() },
            });

            await emailAdapter.sendToOne('PeopleEat', emailAddress, 'Herzlich Willkommen', welcome({ webAppUrl }));

            if (!emailSuccess) {
                logger.error('Could not create email address update');
                return false;
            }
        }

        if (phoneNumber) {
            const smsSuccess: boolean = await createOnePhoneNumberUpdate({
                dataSourceAdapter,
                smsAdapter,
                logger,
                webAppUrl,
                context,
                request: { userId, phoneNumber: phoneNumber.trim() },
            });

            if (!smsSuccess) {
                logger.error('Could not create phone number update');
                return false;
            }
        }

        if (addresses) for (const address of addresses) await createOneAddress({ runtime, context, request: { userId, ...address } });

        if (cook) await createOneCook({ runtime, context, request: { cookId: userId, ...cook } });
    } else {
        logger.info('Created global booking request for existing user');
        userId =
            existingUserByEmailAddress?.userId ??
            existingUserByPhoneNumber?.userId ??
            existingEmailAddressUpdate?.userId ??
            existingPhoneNumberUpdate?.userId ??
            '';
    }

    if (globalBookingRequest) {
        const globalBookingRequestId: NanoId = createNanoId();
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

        if (!globalBookingRequestSuccess) return false;

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

        // await klaviyoEmailAdapter.sendBookingRequestMail({ recipient: user, data: {} });

        if (emailAddress) {
            const customerEmailSuccess: boolean = await emailAdapter.sendToOne(
                'PeopleEat',
                emailAddress,
                'Bestätigung Deiner Buchungsanfrage',
                globalBookingRequestCustomerConfirmation({
                    webAppUrl,
                    customer: { firstName },
                    globalBookingRequest: {
                        globalBookingRequestId,
                        occasion: globalBookingRequest.occasion,
                        adults: globalBookingRequest.adultParticipants,
                        children: globalBookingRequest.children,
                        location: globalBookingRequest.location.text,
                        date: globalBookingRequest.dateTime.toDateString(),
                        time: moment(globalBookingRequest.dateTime).format('LT'),
                        priceClassType: globalBookingRequest.priceClassType,
                    },
                    chatMessage: globalBookingRequest.message.trim(),
                    categories: categoryTitles,
                    allergies: allergyTitles,
                    kitchen: kitchen?.title,
                }),
            );

            if (!customerEmailSuccess) logger.info('sending email failed');
        }

        // @todo: create one time access token for setting password right after sign up
        // createOneForEmailAddress

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
            }<br/><br/><br/><b>Contact:</b><br/>Email Address: ${emailAddress}<br/>Phone Number: ${phoneNumber}<br/><br/>Kitchen: ${
                kitchen?.title ?? 'any'
            }<br/><br/>Allergies: ${allergyTitles.join(', ')}<br/><br/>Categories: ${categoryTitles.join(', ')}`,
        );

        if (!globalBookingRequestEmailSuccess) return false;
    }

    return true;
}
