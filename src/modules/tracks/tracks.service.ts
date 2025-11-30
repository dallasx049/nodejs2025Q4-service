import { Injectable } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  getAll(): Promise<Track[]> {
    return Promise.resolve(this.tracks);
  }

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return new Promise((res) => {
      const track = { ...createTrackDto, id: v4() };

      this.tracks.push(track);

      res(track);
    });
  }

  getOne(id: Track['id']): Promise<Track | null> {
    return new Promise((res) => {
      const track = this.tracks.find((track) => track.id === id) ?? null;

      res(track);
    });
  }

  update(
    id: Track['id'],
    body: Partial<Omit<Track, 'id'>>,
  ): Promise<Track | null> {
    return new Promise(async (res) => {
      const index = this.tracks.findIndex((track) => track.id === id);

      if (index === -1) {
        return res(null);
      }

      const track = this.tracks[index];
      const updatedTrack = { ...track, ...body };

      this.tracks[index] = updatedTrack;

      res(updatedTrack);
    });
  }

  delete(id: Track['id']): Promise<Track | null> {
    return new Promise(async (res) => {
      const index = this.tracks.findIndex((track) => track.id === id);

      if (index === -1) {
        return res(null);
      }

      const deletedTrack = this.tracks[index];
      this.tracks.splice(index, 1);

      res(deletedTrack);
    });
  }
}
