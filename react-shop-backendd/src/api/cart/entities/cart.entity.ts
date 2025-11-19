import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public count: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  public user: User;

  @Column()
  public price: number

  @ManyToOne(
    () => Product,
    (product: Product) => product.cart,
    { orphanedRowAction: 'delete', onDelete: 'CASCADE' }
  )
  @JoinColumn()
  public product: Product;
}
