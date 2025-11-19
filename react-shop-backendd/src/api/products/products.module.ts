import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FilesModule } from '../files/files.module';
import { ProductsFiltersModule } from '../products-filters/products-filters.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    FilesModule,
    ProductsFiltersModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
