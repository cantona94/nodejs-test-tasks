import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductToOrder } from './productToOrder.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.order)
  productToOrders: ProductToOrder[];
}
