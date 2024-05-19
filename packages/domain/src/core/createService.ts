import { CronJob } from 'cron';
import moment from 'moment';
import { createAddressService } from './address/createAddressService';
import { createAdminService } from './admin/createAdminService';
import { createAllergyService } from './allergy/createAllergyService';
import { createBookingRequestService } from './booking-request/createBookingRequestService';
import { createCategoryService } from './category/createCategoryService';
import { createChatMessageService } from './chat-message/createChatMessageService';
import { createConfiguredMenuService } from './configured-menu/createConfiguredMenuService';
import { createCookLanguageService } from './cook-language/createCookLanguageService';
import { createCookService } from './cook/createCookService';
import { createCourseService } from './course/createCourseService';
import { createEmailAddressUpdateService } from './email-address-update/createEmailAddressUpdateService';
import { createFavoriteCookService } from './favorite-cook/createFavoriteCookService';
import { createGiftCardPromoCodeService } from './gift-card-promo-code/createGiftCardPromoCodeService';
import { createGlobalBookingRequestService } from './global-booking-request/createGlobalBookingRequestService';
import { createKitchenService } from './kitchen/createKitchenService';
import { createLanguageService } from './language/createLanguageService';
import { createLogService } from './log/createLogService';
import { createMealOptionService } from './meal-option/createMealOptionService';
import { createMealService } from './meal/createMealService';
import { createMenuCategoryService } from './menu-category/createMenuCategoryService';
import { createMenuService } from './menu/createMenuService';
import { createOneTimeAccessTokenService } from './one-time-access-token/createOneTimeAccessTokenService';
import { createPhoneNumberUpdateService } from './phone-number-update/createPhoneNumberUpdateService';
import { createPublicCookService } from './public-cook/createPublicCookService';
import { createPublicMenuService } from './public-menu/createPublicMenuService';
import { createPublicPrivacyPolicyUpdateService } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateService';
import { createPublicTermsUpdateService } from './public-terms-update/createPublicTermsUpdateService';
import { createPublicUserService } from './public-user/createPublicUserService';
import { type Runtime } from './Runtime';
import { createSearchRequestService } from './search-request/createMealService';
import { type Service } from './Service';
import { createSessionService } from './session/createSessionService';
import { createSupportRequestService } from './support-request/createSupportRequestService';
import { type TimeTriggeredTask } from './time-triggered-tasks';
import { findAllTimeTriggeredTasks } from './time-triggered-tasks/useCases/findAll';
import { handleTimeTriggeredTask } from './time-triggered-tasks/useCases/handleTimeTriggeredTask';
import { createUserService } from './user/createUserService';

export function createService(runtime: Runtime): Service {
    findAllTimeTriggeredTasks(runtime)
        .then((timeTriggeredTasks: TimeTriggeredTask[]) => {
            runtime.logger.info(`Loaded: ${timeTriggeredTasks.length} time triggered tasks`);
            timeTriggeredTasks.forEach((timeTriggeredTask: TimeTriggeredTask) => {
                try {
                    const job: CronJob = CronJob.from({
                        // WARNING: Date in past. Will never be fired.
                        cronTime: moment(timeTriggeredTask.dueDate).toDate(),
                        start: true,
                        onTick: async function () {
                            const shouldTrigger: boolean = moment(timeTriggeredTask.dueDate).diff(moment()) < 0;
                            if (!shouldTrigger) return;
                            await handleTimeTriggeredTask(runtime, timeTriggeredTask);
                            job.stop();
                        },
                    });

                    runtime.logger.info(`Initialized time triggered task ${timeTriggeredTask.task.type}`);
                } catch (error) {
                    runtime.logger.error(`Error during time triggered task initialization:\n` + error);
                }
            });
        })
        .catch((error: Error) => runtime.logger.error(error));

    return {
        log: createLogService(runtime),
        publisher: runtime.publisher,

        language: createLanguageService(runtime),
        category: createCategoryService(runtime),
        kitchen: createKitchenService(runtime),
        allergy: createAllergyService(runtime),
        user: createUserService(runtime),
        session: createSessionService(runtime),
        admin: createAdminService(runtime),
        publicTermsUpdates: createPublicTermsUpdateService(runtime),
        publicPrivacyPolicyUpdates: createPublicPrivacyPolicyUpdateService(runtime),
        emailAddressUpdate: createEmailAddressUpdateService(runtime),
        phoneNumberUpdate: createPhoneNumberUpdateService(runtime),
        address: createAddressService(runtime),
        cook: createCookService(runtime),
        publicUser: createPublicUserService(runtime),
        publicCook: createPublicCookService(runtime),
        publicMenu: createPublicMenuService(runtime),
        meal: createMealService(runtime),
        menu: createMenuService(runtime),
        menuCategory: createMenuCategoryService(runtime),
        cookLanguage: createCookLanguageService(runtime),
        course: createCourseService(runtime),
        mealOption: createMealOptionService(runtime),
        globalBookingRequest: createGlobalBookingRequestService(runtime),
        bookingRequest: createBookingRequestService(runtime),
        chatMessage: createChatMessageService(runtime),
        configuredMenu: createConfiguredMenuService(runtime),
        favoriteCook: createFavoriteCookService(runtime),
        oneTimeAccessToken: createOneTimeAccessTokenService(runtime),
        supportRequest: createSupportRequestService(runtime),
        searchRequest: createSearchRequestService(runtime),
        giftCardPromoCode: createGiftCardPromoCodeService(runtime),
    };
}
