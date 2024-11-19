import { Request } from 'express';

export type getProductsType = {
  name?: string;
  PLU?: string;
};

export type createProductType = {
  name?: string;
  shopId?: number;
};

export type getStocksType = {
  PLU?: string;
  shopId?: number;
  startQuantityInStock?: number;
  endQuantityInStock?: number;
  startQuantityInOrder?: number;
  endQuantityInOrder?: number;
};

export type createStockType = {
  quantity?: number;
  productId?: number;
  shelfId?: number;
};

export interface CustomRequest<T> extends Request {
  body: T;
}
export interface IAxiosRequest {
  PLU: string;
  shopId: number;
  action: string;
}
