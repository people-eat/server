import bcrypt from 'bcryptjs';
import { createWriteStream } from 'fs';
import moment from 'moment';
import { join } from 'path';
import { type Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBAllergy, type DBCategory, type DBKitchen } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { createOne as createOneAddress } from '../../address/useCases/createOne';
import { createOne as createOneCook } from '../../cook/useCases/createOne';
import { createOne as createOneEmailAddressUpdate } from '../../email-address-update/useCases/createOne';
import { type NanoId } from '../../shared';
import { type CreateOneUserByEmailAddressRequest } from '../CreateOneUserRequest';

export interface CreateOneUserByEmailAddressInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    serverUrl: string;
    webAppUrl: string;
    context: Authorization.Context;
    request: CreateOneUserByEmailAddressRequest;
}

// eslint-disable-next-line max-statements
export async function createOneByEmailAddress({
    dataSourceAdapter,
    emailAdapter,
    logger,
    serverUrl,
    webAppUrl,
    context,
    request,
}: CreateOneUserByEmailAddressInput): Promise<boolean> {
    const {
        emailAddress,
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

    let profilePictureUrl: string | undefined;

    if (profilePicture) {
        const profilePictureId: NanoId = createNanoId();
        profilePictureUrl = serverUrl + '/profile-pictures/' + profilePictureId;
        await new Promise<boolean>((resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
            profilePicture
                .pipe(createWriteStream(join(process.cwd(), `images/profile-pictures/${profilePictureId}.png`)))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false)),
        );
    }

    const userId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.userRepository.insertOne({
        userId,
        isLocked: false,
        emailAddress: undefined,
        phoneNumber: undefined,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
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

    if (!success) return false;

    const emailSuccess: boolean = await createOneEmailAddressUpdate({
        dataSourceAdapter,
        emailAdapter,
        logger,
        webAppUrl,
        context: { ...context, userCreation: true },
        request: { userId, emailAddress: emailAddress.trim() },
    });

    if (!emailSuccess) return false;

    if (addresses)
        for (const address of addresses) await createOneAddress({ dataSourceAdapter, logger, context, request: { userId, ...address } });

    if (cook) {
        await createOneCook({
            dataSourceAdapter,
            logger,
            context: { ...context, userCreation: true },
            request: { cookId: userId, ...cook },
        });
    }

    if (globalBookingRequest) {
        const globalBookingRequestSuccess: boolean = await dataSourceAdapter.globalBookingRequestRepository.insertOne({
            globalBookingRequestId: createNanoId(),
            userId,
            adultParticipants: globalBookingRequest.adultParticipants,
            children: globalBookingRequest.children,
            amount: globalBookingRequest.price.amount,
            currencyCode: globalBookingRequest.price.currencyCode,
            dateTime: globalBookingRequest.dateTime,
            duration: globalBookingRequest.duration,
            occasion: globalBookingRequest.occasion.trim(),
            message: globalBookingRequest.message.trim(),
            kitchenId: globalBookingRequest.kitchenId,
            latitude: globalBookingRequest.location.latitude,
            longitude: globalBookingRequest.location.longitude,
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

        const categories: DBCategory[] = [];

        if (globalBookingRequest.categoryIds) {
            for (const categoryId of globalBookingRequest.categoryIds) {
                const category: DBCategory | undefined = await dataSourceAdapter.categoryRepository.findOne({ categoryId });
                // eslint-disable-next-line max-depth
                if (category) categories.push(category);
            }
        }

        const formattedDateTime: string = moment(globalBookingRequest.dateTime).format('MMMM Do YYYY, h:mm a');

        // 'contact@people-eat.com'
        const globalBookingRequestEmailSuccess: boolean = await emailAdapter.sendToMany(
            'Booking Request',
            ['yilmaz.cem.2603@gmail.com'],
            `from ${firstName} ${lastName}`,
            `A new Booking Request was received from <b>${firstName} ${lastName}</b><br/><br/><b>When:</b> ${formattedDateTime}<br/><b>Where:</b> ${'Todo: city name'}<br/><b>Occasion:</b> ${
                globalBookingRequest.occasion
            }<br/><br/><b>Adults:</b> ${globalBookingRequest.adultParticipants}<br/><b>Children:</b> ${
                globalBookingRequest.children
            }<br/><br/><b>Budget:</b> ${globalBookingRequest.price.amount} ${
                globalBookingRequest.price.currencyCode
            }<br/><br/><b>Message:</b><br/>${
                globalBookingRequest.message
            }<br/><br/><br/><b>Contact:</b><br/>Email Address: ${emailAddress}<br/><br/>Kitchen: ${
                kitchen?.title ?? 'any'
            }<br/><br/>Allergies: ${allergies.map(({ title }: DBAllergy) => title).join(', ')}<br/><br/>Categories: ${categories
                .map(({ title }: DBCategory) => title)
                .join(', ')}`,
        );

        if (!globalBookingRequestEmailSuccess) return false;
    }

    return true;
}