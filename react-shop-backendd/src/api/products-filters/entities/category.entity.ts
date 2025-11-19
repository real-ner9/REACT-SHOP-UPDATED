import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseFilterEntity } from './base-filter.entity';
import LocalFile from '../../files/entities/local-file.entity';

@Entity()
export class Category extends BaseFilterEntity {
  @JoinColumn({ name: 'img_id' })
  @OneToOne(() => LocalFile, {
    onDelete: 'CASCADE',
  })
  public img?: LocalFile;

  @Column('int', { nullable: true })
  img_id?: number;
}
