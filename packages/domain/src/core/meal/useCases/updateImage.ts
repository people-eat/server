import { createWriteStream, type ReadStream } from 'fs';
import { join } from 'path';
import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    serverUrl: string;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        mealId: NanoId;
        image?: ReadStream;
    };
}

export async function updateImage({ dataSourceAdapter, logger, serverUrl, context, request }: UpdateCookIsVisibleInput): Promise<boolean> {
    const { cookId, mealId, image } = request;

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

    const success: boolean = await dataSourceAdapter.mealRepository.updateOne({ cookId, mealId }, { imageUrl });

    return success;
}
