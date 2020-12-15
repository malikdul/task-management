import { Controller, Logger, ParseIntPipe, Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Body, Param, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
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
    async uploadFile(@UploadedFile() file: FileDto, @Body() body, @GetUser() user: User) {
        this.logger.log(`Controller: saving file, ${body.taskId}, ${user}`);
        file.taskId = body.taskId;
        return await this.service.save(file);
    }
}
