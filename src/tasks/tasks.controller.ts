import { Body, Controller, Get, NotAcceptableException, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TasksFilterDto } from './tasks-filter.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private readonly logger = new Logger(TasksController.name);
    constructor(
        private readonly service: TasksService
    ) { }

    @Get()
    getTasks(@Query() filterDto: TasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User "${user.email}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.service.getTasks(filterDto, user);
    }

    @Post()
    async addTask(@Body() task: TaskDto, @GetUser() user: User): Promise<TaskDto> {
        if (!task) {
            throw new NotAcceptableException("data is empty");
        }
        return await this.service.addTask(task, user);
    }
}
