import { SubscribEntity } from './entities/subscriben.entity';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubscribEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
