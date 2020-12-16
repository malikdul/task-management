import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { UserRole } from "./user.role";

export class UserDto {

    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    last_name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;
    
    @Exclude()
    salt: string;

    @ApiProperty({description: 'role must be from one of values i.e. USER, ADMIN'})
    @IsOptional()
    @IsIn([UserRole.USER, UserRole.ADMIN])
    role: UserRole;
}