import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { parseDto, parseUUID } from '../../lib/validation';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateTrackDtoSchema, UpdateTrackDtoSchema } from './lib/validation';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('/track')
export class TracksController {
  constructor(
    private tracksService: TracksService,
    private favoritesService: FavoritesService,
  ) {}

  @Get()
  async getAll() {
    return this.tracksService.getAll();
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const dto = parseDto(CreateTrackDtoSchema, createTrackDto);

    return await this.tracksService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const track = await this.tracksService.getOne(uuid);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const uuid = parseUUID(id);
    const dto = parseDto(UpdateTrackDtoSchema, updateTrackDto);
    const updatedTrack = await this.tracksService.update(uuid, dto);

    if (!updatedTrack) {
      throw new NotFoundException();
    }

    return updatedTrack;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const deletedTrack = await this.tracksService.delete(uuid);

    if (!deletedTrack) {
      throw new NotFoundException();
    }

    this.favoritesService.removeTrack(uuid);

    return deletedTrack;
  }
}
