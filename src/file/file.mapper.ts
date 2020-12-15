import { Injectable } from "@nestjs/common";
import { FileDto } from "./file.dto";
import { Attachment } from "./attachment.entity";
import { classToClass, plainToClass } from "class-transformer";

@Injectable()
export class FileAttachmentMapper {

    toDto(entity: Attachment): FileDto {
        // let dto = new FileDto();
        // dto.filename = entity.filename;
        // dto.mimetype = entity.mimetype;
        // dto.originalname = entity.originalname;
        // dto.path = entity.path;

        return plainToClass(FileDto, entity);
    }

    toEntity(dto: FileDto): Attachment {
        // let entity = new Attachment();
        // entity.filename = dto.filename;
        // entity.mimetype = dto.mimetype;
        // entity.originalname = dto.originalname;
        // entity.path = dto.path;

        return plainToClass(Attachment, dto);
    }

}