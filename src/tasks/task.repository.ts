import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { TasksFilterDto } from './tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { PaginatedResult } from '../common/format.result';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(filterDto: TasksFilterDto, user: User): Promise<PaginatedResult> {
    const { status, search, page, limit } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (page && limit) {
      const offset = page - 1 <= 0 ? 0 : page - 1;
      query.offset(offset * limit);
    }

    if (limit) {
      query.limit(limit);
    }

    try {
      const data = await query.getMany();
      return {
        data,
        page,
        limit,
        totalCount: await this.count()
      }
    } catch (error) {
      throw new InternalServerErrorException(error, 'failed to search tasks');
    }
  }

  async createTask(task: Task, user: User): Promise<Task> {
    try {
      task.user = user;
      task.userId = user.id;
      task.status = TaskStatus.OPEN;
      return await this.create(task).save();
    } catch (error) {
      this.logger.error(
        `Failed to create a task for user "${user}". Data: ${task}`,
        error.stack,
      );
      throw new InternalServerErrorException(error, 'Unable to create task');
    }
  }
}
