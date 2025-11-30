import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Artist } from '../artists/interfaces/artist.interface';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

  getAll(): Promise<Album[]> {
    return Promise.resolve(this.albums);
  }

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return new Promise((res) => {
      const album = { ...createAlbumDto, id: v4() };

      this.albums.push(album);

      res(album);
    });
  }

  getOne(id: Album['id']): Promise<Album | null> {
    return new Promise((res) => {
      const album = this.albums.find((album) => album.id === id) ?? null;

      res(album);
    });
  }

  update(
    id: Album['id'],
    body: Partial<Omit<Album, 'id'>>,
  ): Promise<Album | null> {
    return new Promise(async (res) => {
      const index = this.albums.findIndex((album) => album.id === id);

      if (index === -1) {
        return res(null);
      }

      const album = this.albums[index];
      const updatedAlbum = { ...album, ...body };

      this.albums[index] = updatedAlbum;

      res(updatedAlbum);
    });
  }

  delete(id: Album['id']): Promise<Album | null> {
    return new Promise(async (res) => {
      const index = this.albums.findIndex((album) => album.id === id);

      if (index === -1) {
        return res(null);
      }

      const deletedAlbum = this.albums[index];
      this.albums.splice(index, 1);

      res(deletedAlbum);
    });
  }

  getByArtistId(id: Artist['id']) {
    return this.albums.find((album) => album.artistId === id) ?? null;
  }
}
