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
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('/artist')
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private favoritesService: FavoritesService,
  ) {}

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

    this.favoritesService.removeArtist(uuid);

    const albums = await this.albumsService.getAll();
    await Promise.all(
      albums
        .filter((album) => album.artistId === uuid)
        .map((album) =>
          this.albumsService.update(album.id, { artistId: null }),
        ),
    );

    const tracks = await this.tracksService.getAll();
    await Promise.all(
      tracks
        .filter((track) => track.artistId === uuid)
        .map((track) =>
          this.tracksService.update(track.id, { artistId: null }),
        ),
    );

    return deletedArtist;
  }
}
