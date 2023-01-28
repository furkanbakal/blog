import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
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

      async login(data: any) {
        const payload = { email: data.email, sub: data.id, role: data.role  };
        const tokens = await this.getTokens(payload);
        await this.updateRefreshToken(data.id, tokens.refreshToken);
        
        return tokens;
      }

      async logout(userId: number) {
        return this.userService.updateRefreshToken(userId, null);
      }



      async getTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            payload,
            {
              secret: this.configService.get<string>('SECRET_KEY'),
              expiresIn: '60s',
            },
          ),
          this.jwtService.signAsync(
            payload,
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '1h',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }

      async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);
      }
}


