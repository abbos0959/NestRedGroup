import { UserEntity } from './../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from './../DB/jwt.config';
import { JwtModuleOptions, JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { TypeOrmModule } from 'typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class AuthModule {}
