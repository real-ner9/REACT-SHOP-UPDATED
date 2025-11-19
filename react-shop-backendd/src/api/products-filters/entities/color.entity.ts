import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseFilterEntity } from './base-filter.entity';
import { Category } from './category.entity';

@Entity()
export class Color extends BaseFilterEntity {
  @JoinColumn({ name: 'category_ids' })
  @OneToMany(() => Category, (category: Category) => category.id)
  public categories?: Category[];

  @Column('int', { array: true, nullable: true })
  category_ids?: number[];

  @Column()
  value: string;
}
