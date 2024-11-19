import { Router } from 'express';
import productController from '../controllers/product-controller';
import stockController from '../controllers/stock-controller';

const router = Router();

router.get('/product', productController.getProducts);
router.post('/product', productController.createProduct);

router.get('/stock', stockController.getStocks);
router.post('/stock', stockController.createStock);
router.patch('/stock/increment/:id', stockController.incrementStock);
router.patch('/stock/decrement/:id', stockController.decrementStock);

export default router;
