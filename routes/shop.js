const path = require('path');
const express = require('express');
const router = express.Router();

const getProductController = require('../controllers/shop');

router.get('/', getProductController.getIndex);
router.get('/products', getProductController.getProduct);
router.get('/products/:productId', getProductController.getProductDetail);
router.get('/cart', getProductController.getCart);
router.post('/add-to-cart', getProductController.postCart);
router.post('/cart-delete-item', getProductController.deleteDataOfKart);
router.get('/checkout', getProductController.getCheckout);
router.get('/orders', getProductController.getOrders);


module.exports = router;