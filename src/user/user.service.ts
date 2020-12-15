import { Injectable, InternalServerErrorException, Logger, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
    logger = new Logger("UserService")
    constructor(
        @InjectRepository(UserRepository)
        private repository: UserRepository,
        private mapper: UserMapper,
      ) {}

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email});
    }

    async addUser(user: UserDto): Promise<UserDto> {
        try {
            const found = await this.repository.findOne({email: user.email});
            if(found) {
                throw new NotAcceptableException(`user with email ${user.email} already exists`);
            }
            this.logger.log("creating user " + user.email);
            const entity = this.mapper.toEntity(user);
            entity.salt = await bcrypt.genSalt();
            entity.password = await bcrypt.hash(entity.password, entity.salt);
            console.log(entity);
            return this.mapper.toDto(await this.repository.createUser(entity));
        } catch (error) {
            throw new InternalServerErrorException(error, "Unable to save user.");
        }
    }
}
