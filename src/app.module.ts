import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { env } from 'process';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MulterModule.register({
      dest: '../images',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'FURKAN\\SQLEXPRESS',
      username: 'sa',
      password: '1',
      database: env.DB_NAME,

      entities: [Blog],
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    HttpModule,
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
