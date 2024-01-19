import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WorldcupModule } from './worldcup/worldcup.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    WorldcupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
