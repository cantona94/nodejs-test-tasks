import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { ProductToOrder } from './entities/productToOrder.entity';
import { ProductToShelf } from './entities/productToShelf.entity';
import { Shop } from './entities/shop.entity';
import { Shelf } from './entities/shelf.entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +process.env.POSTGRES_PORT! || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Product, ProductToOrder, ProductToShelf, Shop, Shelf, Order],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((error: Error) => console.log(error));

export default AppDataSource;
