import { VideoEntity } from './../../video/entities/video.entity';
import { Base } from 'src/utils/base';
import { UserEntity } from './../../users/entities/user.entity';
import { Entity } from 'typeorm';
import { ManyToOne, JoinColumn, Column } from 'typeorm';
@Entity('Comment')
export class CommentEntity extends Base {
  @Column({ default: '', type: 'text' })
  message?: string;

  @ManyToOne(() => UserEntity, (video) => video.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => VideoEntity, (video) => video.comments)
  @JoinColumn({ name: 'video_id' })

  video: VideoEntity;
}
