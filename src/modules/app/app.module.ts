import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule],
})
export class AppModule {}
