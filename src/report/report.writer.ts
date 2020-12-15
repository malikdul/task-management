import { Injectable, Logger } from "@nestjs/common";
import * as fs from 'fs';
import { plainToClass } from "class-transformer";
import { ReportFormat } from "src/common/format.result";

@Injectable()
export class ReportRWService {
    private readonly logger = new Logger("ReportRWService");
    constructor() {
        var dir = '../reports';
        try {
            fs.mkdirSync(dir);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }

    }

    async getCachedReport(name): Promise<any> {
        try {
            let format = await this.read(name);
            this.logger.debug(`fond report ${JSON.stringify(format)}`);
            if (format) {
                const diff = this.diff_minutes(new Date(format.createdAt), new Date());
                if (diff < 15) {
                    this.logger.verbose(`returning cached report, was cached at ${format.createdAt}`);
                    return format.report;
                } else {
                    this.logger.verbose(`report expired, was cached at ${format.createdAt}`);
                }
            } else {
                this.logger.verbose(`no report was cached.`);
            }

            return null;
        } catch (error) {
            this.logger.verbose(`may be no report was cached. ${error}`);
            return null;
        }
    }

    private diff_minutes(dt2: Date, dt1: Date): number {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }

    write(fileName: string, content: ReportFormat): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(`../reports/${fileName}`, JSON.stringify(content), (err) => {
                if (err) {
                    return reject(err);
                }
                this.logger.verbose(`File ${fileName} created!`);
                resolve();
            });
        });
    }

    read(fileName: string): Promise<ReportFormat> {
        return new Promise((resolve, reject) => {
            fs.readFile(`../reports/${fileName}`, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(data.toString()) as ReportFormat);
            });
        });
    }
}