import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private readonly artistIds = new Set<string>();
  private readonly albumIds = new Set<string>();
  private readonly trackIds = new Set<string>();

  addArtist(id: string) {
    this.artistIds.add(id);
  }

  removeArtist(id: string) {
    this.artistIds.delete(id);
  }

  isArtistFavorite(id: string) {
    return this.artistIds.has(id);
  }

  getArtistIds(): string[] {
    return Array.from(this.artistIds);
  }

  addAlbum(id: string) {
    this.albumIds.add(id);
  }

  removeAlbum(id: string) {
    this.albumIds.delete(id);
  }

  isAlbumFavorite(id: string) {
    return this.albumIds.has(id);
  }

  getAlbumIds(): string[] {
    return Array.from(this.albumIds);
  }

  addTrack(id: string) {
    this.trackIds.add(id);
  }

  removeTrack(id: string) {
    this.trackIds.delete(id);
  }

  isTrackFavorite(id: string) {
    return this.trackIds.has(id);
  }

  getTrackIds(): string[] {
    return Array.from(this.trackIds);
  }
}
