import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdminModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.DATABASE_URL, {
      retryWrites: true,
      appName: process.env.APP_NAME,
      w: 'majority',
      dbName: process.env.DATABASE_NAME,
    }),
  ],
  controllers: [AdminController],
})
export class AppModule {}
