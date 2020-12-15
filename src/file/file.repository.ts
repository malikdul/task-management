import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Attachment } from "./attachment.entity";


@EntityRepository(Attachment)
export class FileRepository extends Repository<Attachment> {

    async createAttachment(file: Attachment): Promise<Attachment> {
        try {
          return await this.create(file).save();
        } catch (error) {
          throw new InternalServerErrorException(error, "unable to create attachment ...");
        }
      }
}