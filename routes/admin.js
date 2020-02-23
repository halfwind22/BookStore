const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const addProductController = require('../controllers/admin');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', addProductController.getAddProduct);

router.get('/products', addProductController.getProducts);

router.post('/add-product', addProductController.postAddProduct);

router.get('/edit-product/:productId', addProductController.getEditProduct);

router.post('/edit-product', addProductController.postUpdateProduct);

router.post('/delete-product',addProductController.deleteProduct);

module.exports.router = router;