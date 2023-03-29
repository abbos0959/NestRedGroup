import { IsEmail, IsString } from 'class-validator';
export class UpdateUserDto {
  email?: string;
  password?: string;

  name?: string;

  description?: string;

  avatarPath?: string;
}
