import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { env } from 'process';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import RolesGuard from './auth/guards/roles.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    MulterModule.register({
      dest: '../images',
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'images'),
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'FURKAN\\SQLEXPRESS',
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ],
})
export class AppModule {}
