import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "./task-status.enum";



export class TaskDto {

    @IsOptional()
    public id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    public title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    public description: string;

    @ApiProperty({description: 'status must be from one of values i.e. OPEN, IN_PROGRESS, DONE'})
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    public status: TaskStatus;
  
}