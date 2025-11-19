import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Cart } from './entities/cart.entity';
import { ProductsModule } from '../products/products.module';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart]), UserModule, ProductsModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
