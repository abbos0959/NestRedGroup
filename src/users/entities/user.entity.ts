import { SubscribEntity } from './subscriben.entity';
import { VideoEntity } from './../../video/entities/video.entity';
import { Column, OneToMany, Entity } from 'typeorm';
import { Base } from 'src/utils/base';

@Entity('Users')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: '' })
  name: string;
  @Column({ default: false, name: 'is_verified' })
  IsVerified: Boolean;
  @Column({ default: 0, name: 'subscribers_count' })
  subscriberCount?: number;
  @Column({ default: '', type: 'text' })
  description: string;
  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscribEntity, (video) => video.fromUser)
  subscriptions: SubscribEntity[];

  @OneToMany(() => SubscribEntity, (video) => video.toChannel)
  subscribers: SubscribEntity[];
}
