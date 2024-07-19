import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    access_token: string;
  }> {
    const payload = { sub: username, username: pass };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
