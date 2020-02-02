const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const addProductController = require('../controllers/admin');

// const pathdir=require('../util/path');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// router.get('/add-product',(req,res,next)=>{
//     //res.sendFile(path.join(pathdir,'views','add-product.html'));
//    // res.send('<html><body><form action="/admin/add-product"method="POST">Name:<br><input type="text" name="name"><br><br><input type="submit" value="Add Product"></form></body></html>');
//    res.render('add-product',{pageTitle:'Add Product',
//                             path:'/admin/add-product',
//                             Formscss:true,
//                             Productcss:true,
//                             hasAdminActive:true});
// });

router.get('/add-product', addProductController.getAddProduct);

router.get('/products', addProductController.getProducts);

router.post('/add-product', addProductController.postAddProduct);

router.get('/edit-product/:productId', addProductController.getEditProduct);

router.post('/edit-product', addProductController.postUpdateProduct);

router.post('/delete-product',addProductController.deleteProduct);

// router.post('/add-product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

// router.post('/product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

module.exports.router = router;