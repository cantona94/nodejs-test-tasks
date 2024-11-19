import { Response } from 'express';
import { Product } from '../entities/product.entity';
import { Shop } from '../entities/shop.entity';
import AppDataSource from '../postgres-config';
import { CustomRequest, createProductType, getProductsType } from '../types';
import { axiosRequest } from '../api';

const productController = {
  getProducts: async (
    req: CustomRequest<getProductsType>,
    res: Response
  ): Promise<any> => {
    try {
      const { name, PLU } = req.body;

      if (!name && !PLU) {
        return res
          .status(400)
          .json({ error: 'Передайте хоть бы один параметр!' });
      }

      const productRepository = AppDataSource.getRepository(Product);

      const products: Product[] | null = await productRepository.find({
        where: {
          name,
          PLU,
        },
      });

      if (!products || !products.length)
        return res
          .status(400)
          .json({ error: 'Товаров c такими параметрами нет!' });

      res.status(200).json({
        products,
      });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },

  createProduct: async (
    req: CustomRequest<createProductType>,
    res: Response
  ): Promise<any> => {
    try {
      const { name, shopId } = req.body;

      if (!name || !shopId) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }

      const productRepository = AppDataSource.getRepository(Product);
      const shopRepository = AppDataSource.getRepository(Shop);

      const shop: Shop | null = await shopRepository.findOne({
        where: {
          id: shopId,
        },
      });

      if (!shop)
        return res
          .status(400)
          .json({ error: 'Магазина c таким id не существует!' });

      const product: Product = await productRepository.save({
        shop,
        name,
      });

      axiosRequest(product.PLU, product.shop.id, 'createProduct');

      res.status(200).json({
        product,
      });
    } catch (error) {
      console.error('error', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  },
};

export default productController;
