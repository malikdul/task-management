import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { TasksFilterDto } from './tasks-filter.dto';
import { UserDto } from 'src/user/user.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(filterDto: TasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.name LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
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
      this.logger.error(`Failed to create a task for user "${user}". Data: ${task}`, error.stack);
      throw new InternalServerErrorException(error, 'Unable to create task');
    }
  }
}
