import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
    role: string;
}