import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "./task-status.enum";



export class TaskDto {
    @IsOptional()
    public id: string;
    
    @IsNotEmpty()
    public name: string;
    
    @IsNotEmpty()
    public description: string;

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    public status: TaskStatus;
  
}