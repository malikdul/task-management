import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './typeorm.config';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

console.log(typeOrmConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    FileModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
