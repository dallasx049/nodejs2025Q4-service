import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  getAll(): Promise<Artist[]> {
    return Promise.resolve(this.artists);
  }

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return new Promise((res) => {
      const artist = { ...createArtistDto, id: v4() };

      this.artists.push(artist);

      res(artist);
    });
  }

  getOne(id: Artist['id']): Promise<Artist | null> {
    return new Promise((res) => {
      const artist = this.artists.find((artist) => artist.id === id) ?? null;

      res(artist);
    });
  }

  update(
    id: Artist['id'],
    body: Partial<Omit<Artist, 'id'>>,
  ): Promise<Artist | null> {
    return new Promise(async (res) => {
      const index = this.artists.findIndex((artist) => artist.id === id);

      if (index === -1) {
        return res(null);
      }

      const artist = this.artists[index];
      const updatedArtist = { ...artist, ...body };

      this.artists[index] = updatedArtist;

      res(updatedArtist);
    });
  }

  delete(id: Artist['id']): Promise<Artist | null> {
    return new Promise(async (res) => {
      const index = this.artists.findIndex((artist) => artist.id === id);

      if (index === -1) {
        return res(null);
      }

      const deletedArtist = this.artists[index];
      this.artists.splice(index, 1);

      res(deletedArtist);
    });
  }
}
