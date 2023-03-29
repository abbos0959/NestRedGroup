import { UserEntity } from './../users/entities/user.entity';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  //============Register qilish===================

  async register(dto: CreateAuthDto) {
    const user = await this.UserRepository.findOneBy({ email: dto.email });
    if (user) {
      throw new BadRequestException('bunday user avvaldan mavjud ');
    }

    const hashPassword = await hash(dto.password, 10);

    const newUser = await this.UserRepository.create({
      email: dto.email,
      password: hashPassword,
    });

    const user1 = await this.UserRepository.save(newUser);
    console.log(newUser);

    return {
      user: await this.UserFields(user1),
      accesstoken: await this.issueAccessToken(user1.id),
    };
  }

  //=====login qilish======

  async Login(dto: CreateAuthDto) {
    const user = await this.ValidateUSer(dto);
    return {
      user: await  this.UserFields(user),
      accesstoken: await this.issueAccessToken(user.id),
    };
  }

  /////////////=========== validate================== ////////////////////////////////

  async ValidateUSer(dto: CreateAuthDto) {
    const user = await this.UserRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'password'],
    });
    if (!user) {
      throw new NotFoundException('bunday user mavjud emas');
    }

    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('parol xato');
    }
    return user;
  }

  // ======finish validate ======//////

  // ========Token berish=======//
  async issueAccessToken(userId: number) {
    return this.jwtService.signAsync({ userId }, { expiresIn: '31d' });
  }

  async UserFields(user: UserEntity) {
    return user;
  }
}
