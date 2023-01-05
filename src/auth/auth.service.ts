import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(email: string, pass: string): Promise<any> {

        const user = await this.userService.findByEmail(email);
        if(!user) {
          return;
        }
        
        const isPassCorrect = await bcrypt.compare(pass, user.password);
 
        if (isPassCorrect) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { email: user.email, sub: user.id  };
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload, {secret: process.env.SECRET_KEY})
        }
      }
}
