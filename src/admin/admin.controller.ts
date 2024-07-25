import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthAdminDto } from './dto/auth-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authAdminDto: AuthAdminDto) {
    return this.adminService.signIn(authAdminDto);
  }
}
