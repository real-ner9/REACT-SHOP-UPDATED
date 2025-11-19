import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slide } from './entities/slide.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slide]), FilesModule],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
