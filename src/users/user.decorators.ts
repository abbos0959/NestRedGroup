import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: keyof UserEntity, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
  },
);
