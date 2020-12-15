import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from './task-status.enum';


export class TasksFilterDto {
  @ApiProperty({required: false})
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  page: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
