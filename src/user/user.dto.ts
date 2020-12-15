import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserDto {

    id: number;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    first_name: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(60)
    last_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;
    
    @Exclude()
    salt: string;

    role: string;
}