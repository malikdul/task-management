import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";


const databseConfig = config.get('database');
console.log("create config", databseConfig)
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: databseConfig.type,
    host: databseConfig.host,
    port: databseConfig.port,
    username: databseConfig.username,
    password: databseConfig.password,
    database: databseConfig.name,

    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: databseConfig.synchronize
}