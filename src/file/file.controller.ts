import { Controller, Logger, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { FileDto } from './file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    logger = new Logger('FileController');
    constructor(
        private readonly service: FileService
    ) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: FileDto) {
        this.logger.log("Controller: saving file");

        return await this.service.save(file);
    }
}
