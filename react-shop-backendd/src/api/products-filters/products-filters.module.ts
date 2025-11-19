import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FilesModule } from '../files/files.module';
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Brand } from './entities/brand.entity';
import { BrandsService } from './services/brands/brands.service';
import { Color } from './entities/color.entity';
import { Amount } from './entities/amount.entity';
import { ColorsController } from './controllers/colors/colors.controller';
import { AmountController } from './controllers/amount/amount.controller';
import { ColorsService } from './services/colors/colors.service';
import { AmountService } from './services/amount/amount.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Brand, Color, Amount]),
    FilesModule,
  ],
  controllers: [
    CategoriesController,
    BrandsController,
    ColorsController,
    AmountController,
  ],
  providers: [CategoriesService, BrandsService, ColorsService, AmountService],
  exports: [CategoriesService, BrandsService, ColorsService, AmountService],
})
export class ProductsFiltersModule {}
