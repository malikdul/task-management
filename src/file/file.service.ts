import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from './file.dto';
import { Attachment } from './attachment.entity';
import { FileRepository } from './file.repository';
import { FileAttachmentMapper } from './file.mapper';

@Injectable()
export class FileService {
    logger = new Logger("FileService")
    constructor(
        @InjectRepository(FileRepository)
        private repository: FileRepository,
        private readonly mapper: FileAttachmentMapper,
      ) {}
    async save(dto: FileDto): Promise<Attachment> {
        this.logger.log("save:: Attachment");
        return this.repository.createAttachment(this.mapper.toEntity(dto));
    }
}
