import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthAdmin } from './schemas/auth-admin.schema';
import AdminData from 'src/utils/db/admin-data';

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService) {}

  async signIn(auth: AuthAdmin): Promise<{
    access_token: string;
  }> {
    const isMatch =
      AdminData.password === auth.password && AdminData.username === auth.email;
    if (isMatch) {
      const payload = {
        email: auth.email,
        sub: auth.email + auth.password,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
