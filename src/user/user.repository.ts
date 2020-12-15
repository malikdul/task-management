import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(entity: User): Promise<User> {
        try {
          return await this.create(entity).save();
        } catch (error) {
          throw new InternalServerErrorException(error, "unable to create User ...");
        }
      }
}