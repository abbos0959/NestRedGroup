import { UserEntity } from './user.entity';
import { VideoEntity } from './../../video/entities/video.entity';
import {
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Base } from 'src/utils/base';

@Entity('Subscription')
export class SubscribEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @JoinColumn({ name: 'to_channel_id' })
  toChannel: VideoEntity;
}
