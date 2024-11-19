import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Shelf } from './shelf.entity';

@Entity()
export class ProductToShelf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productToShelves, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Shelf, (shelf) => shelf.productToShelves, {
    nullable: false,
  })
  shelf: Shelf;
}
