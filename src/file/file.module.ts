import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileAttachmentMapper } from './file.mapper';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([FileRepository]),
      MulterModule.register({
        dest: '../upload',
      }),
    ],
    controllers: [FileController],
    providers: [FileService, FileAttachmentMapper]
  })
export class FileModule {

}
