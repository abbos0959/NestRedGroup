import { CommentEntity } from './../../comment/entities/comment.entity';
import { Base } from 'src/utils/base';
import { UserEntity } from './../../users/entities/user.entity';
import { Entity, OneToMany } from 'typeorm';
import { ManyToOne, JoinColumn, Column } from 'typeorm';
@Entity('Video')
export class VideoEntity extends Base {
  @Column()
  name: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;
  @Column({ default: 0 })
  views?: number;
  @Column({ default: 0 })
  likes?: number;
  @Column({ default: 0 })
  duration?: number;

  @Column({ default: '', type: 'text' })
  description?: string;
  @Column({ default: '', name: 'video_path' })
  videoPath?: string;
  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath?: string;

  @ManyToOne(() => UserEntity, (video) => video.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (video) => video.video)
  comments: CommentEntity[];
}
