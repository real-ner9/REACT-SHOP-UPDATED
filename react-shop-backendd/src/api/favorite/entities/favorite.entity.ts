import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.favorite)
  @JoinColumn()
  public user: User;

  @ManyToOne(
    () => Product,
    (product: Product) => product.favorite,
    { orphanedRowAction: 'delete', onDelete: 'CASCADE' }
  )
  @JoinColumn()
  public product: Product;
}
