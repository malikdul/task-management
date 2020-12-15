import { Injectable } from "@nestjs/common";
import {plainToClass } from "class-transformer";
import { TaskDto } from "./task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskMapper {

    toDto(entity: Task): TaskDto {
        return plainToClass<TaskDto, Task>(TaskDto, entity);
    }

    toEntity(dto: TaskDto): Task {
        return plainToClass(Task, dto);
    }

}