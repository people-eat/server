import { CronJob } from 'cron';
import moment from 'moment';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type CreateOneTimeTriggeredTask } from '../CreateOneTimeTriggeredTask';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';
import { handleTimeTriggeredTask } from './handleTimeTriggeredTask';

export async function createOneTimeTriggeredTask(runtime: Runtime, { dueDate, task }: CreateOneTimeTriggeredTask): Promise<boolean> {
    const timeTriggeredTask: TimeTriggeredTask = {
        timeTriggeredTaskId: createNanoId(),
        dueDate,
        task,
        createdAt: new Date(),
    };

    const success: boolean = await runtime.dataSourceAdapter.timeTriggeredTaskRepository.insertOne(timeTriggeredTask);

    try {
        const job: CronJob = CronJob.from({
            cronTime: dueDate,
            start: true,
            onTick: async function () {
                const shouldTrigger: boolean = moment(timeTriggeredTask.dueDate).diff(moment()) < 0;
                if (!shouldTrigger) return;
                job.stop();
                await handleTimeTriggeredTask(runtime, timeTriggeredTask);
            },
        });
    } catch (error) {
        runtime.logger.error(error);
    }

    return success;
}
