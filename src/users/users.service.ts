import { hash } from 'bcryptjs';
import { SubscribEntity } from './entities/subscriben.entity';
import { UserEntity } from './entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/decorators/auth.decorators';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscribEntity)
    private readonly subscribeRepository: Repository<SubscribEntity>,
  ) {}

  // ============Profile=================

  //============= bitta user================

  async GetByIdUSer(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        videos: true,
        subscriptions: {
          toChannel: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!user) {
      throw new NotFoundException(`bunday ${id} idli user mavjud emas`);
    }
    return user;
  }

  //================= profile yangilash

  async updateProfile(id: number, body: UpdateUserDto) {
    try {
      const user = await this.GetByIdUSer(id);
      if (!user) {
        throw new NotFoundException('bunday user mavjud emas');
      }

      if (body.password) {
        user.password = await hash(body.password, 10);
      }

      user.email = body.email;

      user.name = body.name;
      user.description = body.description;
      user.avatarPath = body.avatarPath;

      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('kutilmagan xatolik');
    }
  }

  //==============obuna==================
  async Subscribe(id: number, channelId: number) {
    const data = {
      toChannel: { id: channelId },
      fromUser: { id },
    };
    const IsSubscribe = await this.subscribeRepository.findOneBy(data);

    if (!IsSubscribe) {
      const newSubscriben = await this.subscribeRepository.create(data);
      await this.subscribeRepository.save(newSubscriben);
      return true;
    }
    await this.subscribeRepository.delete(data);
    return false;
  }

  async GetAllUser() {
    return await this.userRepository.find();
  }
}
