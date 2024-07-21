import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Auth } from './schemas/auth.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(auth: Auth): Promise<{
    access_token: string;
  }> {
    const user = await this.userService.findOne(auth.email);

    const isMatch = await bcrypt.compare(auth.password, user.password);
    if (isMatch) {
      const payload = {
        email: user.email,
        sub: user.firstName + user.lastName,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
