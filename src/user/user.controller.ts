import { Body, Controller, Logger, NotAcceptableException, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    logger = new Logger('UserController');
    constructor(
        private readonly service: UserService
    ) {}
    
    @Post('register')
    async addUser(@Body() user: UserDto): Promise<UserDto> {
        if(!user) {
            throw new NotAcceptableException("data is empty");
        }
        return await this.service.addUser(user);
    }
}
