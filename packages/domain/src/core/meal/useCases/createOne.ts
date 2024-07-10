import { createWriteStream, type ReadStream } from 'fs';
import { join } from 'path';
import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneMealRequest } from '../CreateOneMealRequest';

export interface CreateOneMealInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    serverUrl: string;
    context: Authorization.Context;
    request: { cookId: NanoId; meal: CreateOneMealRequest } & { image?: ReadStream };
}

export async function createOne({ dataSourceAdapter, logger, serverUrl, context, request }: CreateOneMealInput): Promise<boolean> {
    const { cookId, meal, image } = request;
    const { title, description, type } = meal;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    let imageUrl: string | undefined;

    if (image) {
        // store different sizes right away
        const imageId: NanoId = createNanoId();
        imageUrl = serverUrl + '/meal-images/' + imageId;
        await new Promise<boolean>((resolve: (success: boolean) => void, reject: (success: boolean) => void) =>
            image
                .pipe(createWriteStream(join(process.cwd(), `images/meal-images/original/${imageId}.png`)))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false)),
        );
    }

    const mealId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.mealRepository.insertOne({
        mealId,
        cookId,
        title,
        description,
        type,
        imageUrl,
        createdAt: new Date(),
    });

    return success;
}
