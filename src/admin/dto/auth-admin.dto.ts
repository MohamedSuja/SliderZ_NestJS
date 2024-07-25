import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
