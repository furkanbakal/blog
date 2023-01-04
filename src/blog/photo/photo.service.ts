import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../../entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(photo: any, blogId: number) {
    const data = { path: photo, blogId: blogId }
    return await this.photoRepository.save(data);
  }

  async getAll() {
    return await this.photoRepository.find();
  }

  async delete(id: number) {
    return await this.photoRepository.delete({ id: id });
  }

  async getById(id: number) {
    return await this.photoRepository.findOneBy({ id: id });
  }
}
