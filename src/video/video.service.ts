import { UserEntity } from './../users/entities/user.entity';
import { VideoEntity } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  Repository,
  FindOptionsWhereProperty,
  Like,
  ILike,
  MoreThan,
} from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videorRepository: Repository<VideoEntity>,
  ) {}

  async GetByIdVideo(id: number, IsPublic = false) {
    const video = await this.videorRepository.findOne({
      where: IsPublic ? { id, isPublic: true } : { id },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          subscriberCount: true,
          subscriptions: true,
        },

        comments: {
          message: true,
          id: true,
          user: {
            name: true,
            avatarPath: true,
            subscriberCount: true,
          },
        },
      },

      order: {
        createdAt: 'DESC',
      },
    });

    if (!video) {
      throw new NotFoundException(`bunday ${id} idli video mavjud emas`);
    }
    return video;
  }

  //================= video yangilash

  async updateVideo(id: number, body: UpdateVideoDto) {
    try {
      const video = await this.GetByIdVideo(id);
      if (!video) {
        throw new NotFoundException('bunday video mavjud emas');
      }

      return this.videorRepository.save({
        ...video,
        ...body,
      });
    } catch (error) {
      throw new BadRequestException('kutilmagan xatolik');
    }
  }

  async GetAllVideo(search?: string) {
    let options: FindOptionsWhereProperty<VideoEntity> = {};

    if (search) {
      options = {
        name: ILike(`%${search}%`),
      };
    }

    return await this.videorRepository.find({
      where: {
        ...options,
        isPublic: true,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
        },
      },
    });
  }
  async getMostPopular() {
    return this.videorRepository.find({
      where: {
        views: MoreThan(0),
      },

      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
        },
      },
      order: {
        views: -1,
      },
    });
  }

  async Create(UserId: number) {
    const defaultValue = {
      name: '',
      user: { id: UserId },
      description: '',
      videPath: '',
      thumbnailPath: '',
    };

    const newVideo = this.videorRepository.create(defaultValue);
    const video = await this.videorRepository.save(newVideo);
    return video.id;
  }
  async deleteVide(id: number) {
    const video = await this.videorRepository.delete({ id });
    return video;
  }

  async UpdatecountViews(id: number) {
    const video = await this.GetByIdVideo(id);

    if (!video) {
      throw new NotFoundException('bunday video mavjud emas');
    }
    video.views++;
    return this.videorRepository.save(video);
  }
}
