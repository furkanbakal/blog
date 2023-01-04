import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';;
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
    /**
     *
     */
    constructor(@InjectRepository(Blog)
                private blogRepository: Repository<Blog>) {}

      async create(blog: BlogDto) {
         return await this.blogRepository
            .save(blog)
            .catch((err) => {throw new HttpException('Beklenmeyen bir hata meydana geldi!', 500)});
      }
      

      async getAll() {
        return await this.blogRepository.find();
      }

      async update(id: number, data: BlogDto) {
         return await this.blogRepository.update({id: id}, data);
      } 

      async delete(id: number) {
        return await this.blogRepository.delete({id: id});
      }

      async getById(id: number) {
        return await this.blogRepository.findOneBy({id: id});
      }
}
