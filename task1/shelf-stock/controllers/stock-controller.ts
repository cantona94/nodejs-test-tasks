import { Request, Response } from 'express';
import AppDataSource from '../postgres-config';
import { ProductToShelf } from '../entities/productToShelf.entity';
import { Product } from '../entities/product.entity';
import { Shelf } from '../entities/shelf.entity';
import { CustomRequest, createStockType, getStocksType } from '../types';
import { axiosRequest } from '../api';

const stockController = {
  getStocks: async (
    req: CustomRequest<getStocksType>,
    res: Response
  ): Promise<any> => {
    try {
      const {
        PLU,
        shopId,
        startQuantityInStock,
        endQuantityInStock,
        startQuantityInOrder,
        endQuantityInOrder,
      } = req.body;

      if (
        !PLU &&
        !shopId &&
        (!startQuantityInStock || !endQuantityInStock) &&
        (!startQuantityInOrder || !endQuantityInOrder)
      ) {
        return res
          .status(400)
          .json({ error: 'Передайте хоть бы один параметр!' });
      }

      const stockRepository = AppDataSource.getRepository(ProductToShelf);
      let queryBuilder = stockRepository
        .createQueryBuilder('productToShelf')
        .leftJoinAndSelect('productToShelf.product', 'product');

      if (PLU) {
        queryBuilder.where('product.PLU = :PLU', { PLU });
      }

      if (shopId) {
        queryBuilder.andWhere('product.shop = :shopId', { shopId });
      }

      if (startQuantityInStock || endQuantityInStock)
        queryBuilder.andWhere(
          'productToShelf.quantity BETWEEN :startQuantityInStock AND :endQuantityInStock',
          { startQuantityInStock, endQuantityInStock }
        );

      if (startQuantityInOrder || endQuantityInOrder) {
        queryBuilder.leftJoinAndSelect(
          'product.productToOrders',
          'productToOrders'
        );
        queryBuilder.andWhere(
          'productToOrders.quantity BETWEEN :startQuantityInOrder AND :endQuantityInOrder',
          { startQuantityInOrder, endQuantityInOrder }
        );
      }

      const result = await queryBuilder.getMany();

      if (!result.length) {
        return res.status(400).json({ result: 'Ничего не найдено!' });
      }

      res.status(200).json({
        result,
      });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },

  createStock: async (
    req: CustomRequest<createStockType>,
    res: Response
  ): Promise<any> => {
    try {
      const { quantity, productId, shelfId } = req.body;

      if (!quantity || !productId || !shelfId) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }

      const stockRepository = AppDataSource.getRepository(ProductToShelf);
      const productRepository = AppDataSource.getRepository(Product);
      const shelfRepository = AppDataSource.getRepository(Shelf);

      const product: Product | null = await productRepository.findOne({
        where: {
          id: productId,
        },
      });
      
      if (!product)
        return res
          .status(400)
          .json({ error: 'Товара с таким id не существует!' });

      const shelf: Shelf | null = await shelfRepository.findOne({
        where: {
          id: shelfId,
        },
      });

      if (!shelf)
        return res
          .status(400)
          .json({ error: 'Полки c таким id не существует!' });

      const productToShop = await AppDataSource.getRepository(Product)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.shop', 'shop')
        .where('product.id = :id', { id: productId })
        .getMany();

      const stock: ProductToShelf = await stockRepository.save({
        quantity,
        product,
        shelf,
      });

      axiosRequest(product.PLU, productToShop[0].shop.id, 'createStock');

      res.status(200).json({
        stock,
      });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },

  incrementStock: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const productToShelf = await AppDataSource.getRepository(ProductToShelf)
        .createQueryBuilder('productToShelf')
        .leftJoinAndSelect('productToShelf.product', 'product')
        .leftJoinAndSelect('product.shop', 'shop')
        .where('productToShelf.id = :id', { id: +id })
        .getMany();

      const productToShelfRepository =
        AppDataSource.getRepository(ProductToShelf);

      if (!productToShelf)
        return res
          .status(400)
          .json({ error: 'Остатка c таким id не существует!' });

      const result = ++productToShelf[0].quantity;

      await productToShelfRepository.update(id, productToShelf[0]);

      axiosRequest(
        productToShelf[0].product.PLU,
        productToShelf[0].product.shop.id,
        'incrementStock'
      );

      res.status(200).json(`Остаток увеличен до ${result}`);
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },

  decrementStock: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const productToShelf = await AppDataSource.getRepository(ProductToShelf)
        .createQueryBuilder('productToShelf')
        .leftJoinAndSelect('productToShelf.product', 'product')
        .leftJoinAndSelect('product.shop', 'shop')
        .where('productToShelf.id = :id', { id: +id })
        .getMany();

      const productToShelfRepository =
        AppDataSource.getRepository(ProductToShelf);

      if (!productToShelf)
        return res
          .status(400)
          .json({ error: 'Остатка c таким id не существует!' });

      if (!productToShelf[0].quantity)
        return res.status(400).json({ error: 'Остаток уже на 0!' });

      const result = --productToShelf[0].quantity;

      await productToShelfRepository.update(id, productToShelf[0]);

      axiosRequest(
        productToShelf[0].product.PLU,
        productToShelf[0].product.shop.id,
        'decrementStock'
      );

      res.status(200).json(`Остаток уменьшен до ${result}`);
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },
};

export default stockController;
