import { UserEntity } from './../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SubscribEntity } from 'src/users/entities/subscriben.entity';
export const OrmConfig = async (
  configservice: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abbos1999',
  database: 'RedGroup',
  synchronize: true,
  entities: [],
});
