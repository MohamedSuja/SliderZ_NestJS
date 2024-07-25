import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { AdminController } from './admin.controller';

@Module({
  providers: [AdminService],

  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AdminModule,
  ],

  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
