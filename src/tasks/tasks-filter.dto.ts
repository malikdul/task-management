import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from './task-status.enum';


export class TasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
