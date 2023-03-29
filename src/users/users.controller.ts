import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  UsePipes,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from './user.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async Profile(@CurrentUser('id') id: number) {
    return this.usersService.GetByIdUSer(id);
  }

  @Get('all')
  async GetaAllUser() {
    return this.usersService.GetAllUser();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('subscriber/:channelid')
  @UseGuards(JwtAuthGuard)
  async SubscribeToChannel(
    @CurrentUser('id') id: number,
    @Param('channelid') channelId: string,
  ) {
    return this.usersService.Subscribe(+id, +channelId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateUser(
    @Param('id') id: string,
    // @CurrentUser('id') id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(+id, UpdateUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async GetById(@Param('id') id: string) {
    return this.usersService.GetByIdUSer(+id);
  }
}
