import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import {
  isValidCreateArtistDto,
  isValidUpdateArtistDto,
  isValidUUID,
} from '../../lib/validation';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('/artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return this.artistsService.getAll();
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    if (!isValidCreateArtistDto(createArtistDto)) {
      throw new HttpException(
        'You must provide a valid payload',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.artistsService.create(createArtistDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    const artist = await this.artistsService.getOne(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isValidUpdateArtistDto(updateArtistDto)) {
      throw new HttpException(
        'You must provide a valid payload',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedArtist = await this.artistsService.update(id, updateArtistDto);

    if (!updatedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return updatedArtist;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(
        'Id must be a valid UUID',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deletedArtist = await this.artistsService.delete(id);

    if (!deletedArtist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return deletedArtist;
  }
}
