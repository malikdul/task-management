import { Body, Controller, Logger, NotAcceptableException, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    logger = new Logger('AuthController');
    constructor(
        private readonly service: UserService,
        private jwtService: JwtService,
    ) {}
    
    @Post('signIn')
    async signIn(@Body() login: LoginDto): Promise<{ accessToken: string }> {
        if(!login) {
            throw new NotAcceptableException("data is empty");
        }
        const user = await this.service.findByEmail(login.email);

        if (!user || !await user.validatePassword(login.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        login.role = user.role;
        const accessToken = await this.jwtService.sign(login);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(login)}`);

        return { accessToken };
    }
}
