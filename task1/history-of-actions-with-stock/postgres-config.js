import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import Action from './entities/action.entity.js';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Action],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((error) => console.log(error));

export default AppDataSource;
