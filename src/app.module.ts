import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [UsersModule, ArtistsModule],
})
export class AppModule {}
