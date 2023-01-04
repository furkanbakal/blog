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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(data: {email: string, password: string}) {
      const user = await this.userRepository.findOneBy({email: data.email});
      if(!user) {
        return;
      }
      
      return await bcrypt.compare(data.password, user.password);
  }
}
