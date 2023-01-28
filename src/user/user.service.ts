import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  /**
   *
   */

  saltOrRounds = 10;
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {

  const hash = await bcrypt.hash(createUserDto.password, this.saltOrRounds);

  createUserDto.password = hash

  return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id: id});
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({email: email});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    return await this.userRepository.update(id, {refreshToken: refreshToken})
  }

  async remove(id: number) {
    return await this.userRepository.delete({id: id});
  }

}
