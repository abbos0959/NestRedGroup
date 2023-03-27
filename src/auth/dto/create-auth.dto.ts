import { Base } from 'src/utils/base';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class CreateAuthDto extends Base {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: "parol kamida 6ta belgidan iborat bo'lishi kerak",
  })
  @IsString()
  password: string;
}
