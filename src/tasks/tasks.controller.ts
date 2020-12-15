import { Body, Controller, Delete, Get, NotAcceptableException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TasksFilterDto } from './tasks-filter.dto';
import { PaginatedResult } from '../common/format.result';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private readonly logger = new Logger(TasksController.name);
    constructor(
        private readonly service: TasksService
    ) { }

    @Get()
    getTasks(@Query() filterDto: TasksFilterDto, @GetUser() user: User): Promise<PaginatedResult> {
        this.logger.verbose(`User "${user.email}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.service.getTasks(filterDto, user);
    }

    @Post()
    async addTask(@Body() task: TaskDto, @GetUser() user: User): Promise<TaskDto> {
        this.logger.verbose(`User "${user.email}" adding new task: "${task.title}".`);
        if (!task) {
            throw new NotAcceptableException("data is empty");
        }
        return await this.service.addTask(task, user);
    }

    @Put()
    async updateTask(@Body() task: TaskDto, @GetUser() user: User): Promise<TaskDto> {
        this.logger.verbose(`User "${user.email}" updating task with id: "${task.id}".`);
        if (!task) {
            throw new NotAcceptableException("data is empty");
        }
        return await this.service.updateTask(task, user);
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
      return this.service.getTaskById(id, user);
    }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.service.deleteTask(id, user);
  }
}
