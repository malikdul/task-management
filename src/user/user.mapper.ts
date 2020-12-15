import { Injectable } from "@nestjs/common";
import {plainToClass } from "class-transformer";
import { User } from "./user.entity";
import { UserDto } from "./user.dto";

@Injectable()
export class UserMapper {

    toDto(entity: User): UserDto {
        return plainToClass<UserDto, User>(UserDto, entity);
    }

    toEntity(dto: UserDto): User {
        return plainToClass(User, dto);
    }

}