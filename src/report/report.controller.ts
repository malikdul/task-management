import { Controller, Get, Logger, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { TaskReport } from 'src/common/format.result';
import { User } from 'src/user/user.entity';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(AuthGuard())
export class ReportController {
    private readonly logger = new Logger(ReportController.name);
    constructor(
        private readonly service: ReportService
    ) { }

    @Get()
    getTaskReport(@GetUser() user: User): Promise<TaskReport> {
        this.logger.verbose(`User "${user.email}" with role ${user.role} retrieving all task report.`);
        return this.service.getTasks(user);
    }

    @Get('average/day/:date')
    getDayAverage(@Param('date') date: Date, @GetUser() user: User): Promise<TaskReport> {
        this.logger.verbose(`User "${user.email}" with role ${user.role} retrieving day average task report for ${date}.`);
        return this.service.getDayAverage(user, date);
    }

    @Get('max/day')
    getMaxInDay(@GetUser() user: User): Promise<TaskReport> {
        this.logger.verbose(`User "${user.email}" with role ${user.role} retrieving day average task report.`);
        return this.service.getMaxCount(user);
    }

    @Get('max/added')
    getMaxAddedInDay(@GetUser() user: User): Promise<TaskReport> {
        this.logger.verbose(`User "${user.email}" with role ${user.role} retrieving max task added report.`);
        return this.service.getMaxCountAdded(user);
    }

    //TODO:: isntall PG extention postgresql-contrib
    //TODO:: apt-get install postgresql-contrib
    //TODO:: CREATE EXTENSION pg_trgm;
    @Get('similar')
    getSimilarTasks(@GetUser() user: User): Promise<TaskReport> {
        this.logger.verbose(`User "${user.email}" with role ${user.role} retrieving similar tasks report.`);
        return this.service.getSimilarTasks(user);
    }
}

