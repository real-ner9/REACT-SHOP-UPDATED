import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Order } from '../../orders/entities/order.entity';
import Role from '../role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @Column({ default: false })
  public isEmailConfirmed!: boolean;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @OneToMany(() => Cart, (cart: Cart) => cart.user)
  public cart: Cart[];

  @OneToMany(() => Favorite, (favorite: Favorite) => favorite.user)
  public favorite: Favorite[];

  @OneToMany(() => Order, (order: Order) => order.user)
  public orders: Order[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;
}
