import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { parseUUID } from '../../lib/validation';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Controller('/favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  @Get()
  async getAll() {
    const [artists, albums, tracks] = await Promise.all([
      Promise.all(
        this.favoritesService
          .getArtistIds()
          .map((id) => this.artistsService.getOne(id)),
      ),
      Promise.all(
        this.favoritesService
          .getAlbumIds()
          .map((id) => this.albumsService.getOne(id)),
      ),
      Promise.all(
        this.favoritesService
          .getTrackIds()
          .map((id) => this.tracksService.getOne(id)),
      ),
    ]);

    return {
      artists: artists.filter((artist) => artist !== null),
      albums: albums.filter((album) => album !== null),
      tracks: tracks.filter((track) => track !== null),
    };
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const track = await this.tracksService.getOne(uuid);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    this.favoritesService.addTrack(uuid);
  }

  @Delete('track/:id')
  async deleteTrack(@Param('id') id: string) {
    const uuid = parseUUID(id);

    if (!this.favoritesService.isTrackFavorite(uuid)) {
      throw new NotFoundException();
    }

    this.favoritesService.removeTrack(uuid);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const album = await this.albumsService.getOne(uuid);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    this.favoritesService.addAlbum(uuid);
  }

  @Delete('album/:id')
  async deleteAlbum(@Param('id') id: string) {
    const uuid = parseUUID(id);

    if (!this.favoritesService.isAlbumFavorite(uuid)) {
      throw new NotFoundException();
    }

    this.favoritesService.removeAlbum(uuid);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    const uuid = parseUUID(id);
    const artist = await this.artistsService.getOne(uuid);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    this.favoritesService.addArtist(uuid);
  }

  @Delete('artist/:id')
  async deleteArtist(@Param('id') id: string) {
    const uuid = parseUUID(id);

    if (!this.favoritesService.isArtistFavorite(uuid)) {
      throw new NotFoundException();
    }

    this.favoritesService.removeArtist(uuid);
  }
}
