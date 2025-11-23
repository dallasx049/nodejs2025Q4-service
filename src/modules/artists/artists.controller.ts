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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { parseDto, parseUUID } from '../../lib/validation';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDtoSchema, UpdateArtistDtoSchema } from './lib/validation';

@Controller('/artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return this.artistsService.getAll();
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const dto = parseDto(CreateArtistDtoSchema, createArtistDto);

    return await this.artistsService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const artist = await this.artistsService.getOne(uuid);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const uuid = parseUUID(id);
    const dto = parseDto(UpdateArtistDtoSchema, updateArtistDto);
    const updatedArtist = await this.artistsService.update(uuid, dto);

    if (!updatedArtist) {
      throw new NotFoundException();
    }

    return updatedArtist;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const deletedArtist = await this.artistsService.delete(uuid);

    if (!deletedArtist) {
      throw new NotFoundException();
    }

    return deletedArtist;
  }
}
