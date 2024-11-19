import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class ProductToOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productToOrders, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.productToOrders, { nullable: false })
  order: Order;
}
