import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductToShelf } from './productToShelf.entity';
import { ProductToOrder } from './productToOrder.entity';
import { Shop } from './shop.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  PLU: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.products, { nullable: false })
  shop: Shop;

  @OneToMany(() => ProductToShelf, (productToShelf) => productToShelf.product)
  productToShelves: ProductToShelf[];

  @OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.product)
  productToOrders: ProductToOrder[];
}
