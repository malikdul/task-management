import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskMapper } from './task.mapper';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TaskRepository]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskMapper]
})
export class TasksModule {}
