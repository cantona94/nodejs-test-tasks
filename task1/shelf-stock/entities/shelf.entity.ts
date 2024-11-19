import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductToShelf } from './productToShelf.entity';

@Entity({ name: 'shelves' })
export class Shelf {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductToShelf, (productToShelf) => productToShelf.shelf)
  productToShelves: ProductToShelf[];
}
