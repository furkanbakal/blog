import { Injectable } from '@nestjs/common';
import { Furkan } from './entities/sena.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello!';
  }
}
