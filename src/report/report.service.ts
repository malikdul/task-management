import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskReport } from 'src/common/format.result';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/task.repository';
import { User } from 'src/user/user.entity';
import { Between, In } from 'typeorm';
import { ReportRWService } from './report.writer';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private reportRW: ReportRWService,
    ) { }
    async getTasks(user: User): Promise<TaskReport> {
        const REPORT_NAME = 'task-report.json';
        const result = await this.reportRW.getCachedReport(REPORT_NAME);
        if (result) {
            return result;
        }
        const total = await this.taskRepository.count({ where: { userId: user.id } });
        const remaining = await this.taskRepository.count({ where: { userId: user.id, status: In([TaskStatus.OPEN, TaskStatus.IN_PROGRESS]) } });
        const completed = await this.taskRepository.count({ where: { userId: user.id, status: TaskStatus.DONE } });

        const report = { total, remaining, completed };
        this.reportRW.write(REPORT_NAME, { createdAt: new Date(), report })
        return report;
    }

    async getDayAverage(user: User, day: Date): Promise<TaskReport> {
        const REPORT_NAME = 'day-average-report.json';
        const result = await this.reportRW.getCachedReport(REPORT_NAME);
        if (result) {
            return result;
        }
        const total = await this.taskRepository.count({ where: { userId: user.id } });
        const [start, end] = this.getDateRange(day);
        const completed = await this.taskRepository.count({ where: { userId: user.id, status: TaskStatus.DONE, updatedAt: Between(start, end) } });
        const report = { total, completed };
        this.reportRW.write(REPORT_NAME, { createdAt: new Date(), report })
        return report;
    }

    async getMaxCount(user: User, day: Date): Promise<any> {
        const REPORT_NAME = 'max-count-report.json';
        let result = await this.reportRW.getCachedReport(REPORT_NAME);
        if(result) {
            return result;
        }

        result = await this.taskRepository.createQueryBuilder('task')
            .select("count(distinct task.*), CAST(task.\"updatedAt\" AS DATE)")
            .where("task.userId = :id AND task.status = 'DONE' ", { id: user.id })
            .groupBy("CAST(task.\"updatedAt\" AS DATE)")
            .orderBy("count", 'DESC')
            .take(1)
            .getRawMany();

        this.reportRW.write(REPORT_NAME, { createdAt: new Date(), report: result })
        return result;
    }

    private getDateRange(day: Date): [Date, Date] {
        let start = new Date(day), end = new Date(day);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
    }


}
