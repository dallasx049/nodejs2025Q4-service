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
import { CreateAlbumDtoSchema, UpdateAlbumDtoSchema } from './lib/validation';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('/album')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private favoritesService: FavoritesService,
  ) {}

  @Get()
  async getAll() {
    return this.albumsService.getAll();
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const dto = parseDto(CreateAlbumDtoSchema, createAlbumDto);

    if (dto.artistId && !this.artistsService.has(dto.artistId)) {
      throw new NotFoundException('Artist with given id not found');
    }

    return await this.albumsService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const album = await this.albumsService.getOne(uuid);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const uuid = parseUUID(id);
    const dto = parseDto(UpdateAlbumDtoSchema, updateAlbumDto);

    if (dto.artistId && !this.artistsService.has(dto.artistId)) {
      throw new NotFoundException('Artist with given id not found');
    }

    const updatedAlbum = await this.albumsService.update(uuid, dto);

    if (!updatedAlbum) {
      throw new NotFoundException();
    }

    return updatedAlbum;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const deletedAlbum = await this.albumsService.delete(uuid);

    if (!deletedAlbum) {
      throw new NotFoundException();
    }

    this.favoritesService.removeAlbum(uuid);

    const tracks = await this.tracksService.getAll();
    await Promise.all(
      tracks
        .filter((track) => track.albumId === uuid)
        .map((track) => this.tracksService.update(track.id, { albumId: null })),
    );

    return deletedAlbum;
  }
}
