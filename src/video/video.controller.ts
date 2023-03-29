import { CurrentUser } from './../users/user.decorators';
import { JwtAuthGuard } from 'src/auth/decorators/auth.decorators';
import { UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('get-private/:id')
  @UseGuards(JwtAuthGuard)
  async Profile(@Param('id') id: number) {
    return this.videoService.GetByIdVideo(id, true);
  }

  @Get('all')
  async GetaAllVideo(@Query('search') search: string) {
    return this.videoService.GetAllVideo(search);
  }
  @Get('most-popular')
  async GetaAllMostVideo() {
    return this.videoService.getMostPopular();
  }

  @HttpCode(200)
  @Post('')
  @UseGuards(JwtAuthGuard)
  async CreateVideo(@CurrentUser('id') id: number) {
    return this.videoService.Create(+id);
  }

  @HttpCode(200)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateUser(
    @Param('id') id: string,

    @Body() UpdateVideoDto: UpdateVideoDto,
  ) {
    return this.videoService.updateVideo(+id, UpdateVideoDto);
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async DeleteVideo(@Param('id') id: string) {
    return this.videoService.deleteVideo(+id);
  }

  @HttpCode(200)
  @Patch('update-views/:id')
  @UseGuards(JwtAuthGuard)
  async UpdateViews(@Param('id') id: string) {
    return this.videoService.UpdatecountViews(+id);
  }

  @HttpCode(200)
  @Patch('update-like/:id')
  @UseGuards(JwtAuthGuard)
  async UpdateLikes(@Param('id') id: string) {
    return this.videoService.UpdatecountLikes(+id);
  }
}
