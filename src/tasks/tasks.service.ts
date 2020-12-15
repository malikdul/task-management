import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TasksFilterDto } from './tasks-filter.dto';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskMapper } from './task.mapper';
import { TaskRepository } from './task.repository'
import { PaginatedResult } from '../common/format.result';

@Injectable()
export class TasksService {
  private readonly logger = new Logger("TaskService")
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private mapper: TaskMapper,
      ) {}

    async addTask(dto:TaskDto, user: User): Promise<TaskDto> {
        return this.mapper.toDto(await this.taskRepository.createTask(this.mapper.toEntity(dto), user));
    }

    async updateTask(dto:TaskDto, user: User): Promise<TaskDto> {
      this.logger.debug(`updating task: "${dto}".`);
        const result = await this.taskRepository.createQueryBuilder()
        .update(Task)
        .set({ title: dto.title, description: dto.description, status: dto.status, updatedAt: new Date() })
        .where({ id: dto.id, userId: user.id })
        .execute();
        return this.mapper.toDto(await this.taskRepository.findOne(dto.id));
    }

    async getTasks(filters: TasksFilterDto, user: User):Promise<PaginatedResult>{
        return this.taskRepository.getTasks(filters, user);
    }
    
    async getTaskById(id: number, user: User ): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
    
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    
        return found;
      }

      async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.createQueryBuilder()
        .delete().from(Task)
        .where({ id, userId: user.id })
        .execute();
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
      }
}
