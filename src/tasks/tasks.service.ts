import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TasksFilterDto } from './tasks-filter.dto';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskMapper } from './task.mapper';
import { TaskRepository } from './task.repository'

@Injectable()
export class TasksService {
    logger = new Logger("TaskService")
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        private mapper: TaskMapper,
      ) {}

    async addTask(dto:TaskDto, user: User): Promise<TaskDto> {
        return await this.taskRepository.createTask(this.mapper.toEntity(dto), user);
    }

    getTasks(filters: TasksFilterDto, user: User):Promise<Task[]>{
        return this.taskRepository.getTasks(filters, user);
    }
}
