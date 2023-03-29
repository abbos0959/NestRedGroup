import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfig = async (
  configservice: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: 'secret',
});




