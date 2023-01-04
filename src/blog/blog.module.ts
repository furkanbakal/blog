import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { PhotoService } from './photo/photo.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
