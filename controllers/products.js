// const Product = require('../models/product');

// module.exports.getAddProduct = (req, res, next) => {
//     res.render('admin/add-product', {
//         pageTitle: 'Add Product',
//         path: '/admin/add-product',
//         Formscss: true,
//         Productcss: true,
//         hasAdminActive: true
//     });
// };

// module.exports.postAddProduct = (req, res, next) => {
//     // products.push({ title: req.body.title});
//     const product = new Product(req.body.title)
//     product.save();
//     res.redirect('/');
// }


// // module.exports.getProduct = (req, res, next) => {
// //     Product.fetchAll((products) => {
// //         res.render('shop/product-list', {
// //             prod: products,
// //             pageTitle: 'BookShop',
// //             path: '/',
// //             hasProduct: products.length > 0,
// //             Productcss: true,
// //             hasShopActive: true,
// //         })});
// //     // res.render('shop',{prod:productdata,
// //     //                    pageTitle:'BookShop',
// //     //                    path:'/',
// //     //                    hasProduct:productdata.length>0,
// //     //                    Productcss:true,
// //     //                    hasShopActive:true,
// //     //   });
// // }