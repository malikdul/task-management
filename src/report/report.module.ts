import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from 'src/tasks/task.repository';
import { TasksModule } from 'src/tasks/tasks.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportRWService } from './report.writer';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([TaskRepository]),
        UserModule, 
        TasksModule
    ],
    controllers: [ReportController],
    providers: [ReportService, ReportRWService],
})
export class ReportModule {

}
