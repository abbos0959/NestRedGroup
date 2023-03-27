import { IsEmail, MinLength, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: "parol kamida 6ta belgidan iborat bo'lishi kerak",
  })
  @IsString()
  password: string;
}
