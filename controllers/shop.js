const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getProduct = (req, res, next) => {
    const products = Product.fetchAll();
    products
        .then(([rows, metadata]) => {
            res.render('shop/product-list', {
                prod: rows,
                pageTitle: 'All Products',
                path: '/shop/products',
                hasProduct: rows.length > 0,
                Productcss: true,
                hasShopActive: true,
            })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProductById(productId)
    .then(([result]) => {
        console.log(result);
        res.render('shop/product-detail', {
            prod: result[0],
            pageTitle: 'Product Detail',
            path: '/shop/products',
            Productcss: true,
            hasShopActive: true,
        })
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports.getIndex = (req, res, next) => {

    Product.fetchAll()
        .then(([rows, metadata]) => {
            res.render('shop/index', {
                prod: rows,
                pageTitle: 'BookShop',
                path: '/shop/index',
                hasProduct: rows.length > 0,
                Productcss: true,
                hasShopActive: true,
            })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getCart = (req, res, next) => {

    Cart.getProductsFromKart()
    .then(([cartData,metadata])=>{
        console.log('cartdata',cartData);
        Product.fetchAll()
        .then(([products,metadata])=>{
            const cartDataArr = [];
            for (product of products) {
                const cartProduct = cartData.find(p => p.id === product.id);
                if (cartProduct) {
                    cartDataArr.push({ productData: product, qty: cartProduct.qty });
                }
            }

            res.render('shop/cart', {
                prod: cartDataArr,
                pageTitle: 'Your Cart',
                path: '/shop/cart',
                hasProduct: cartDataArr.length > 0,
                Productcss: true,
                hasShopActive: true,
            });
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    });
}


module.exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.fetchProductById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

module.exports.deleteDataOfKart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('prodId', prodId);
    Product.fetchProductById(prodId, product => {
        Cart.deletefromKart(prodId, product.price);
        res.redirect('/cart');
    });

}

module.exports.getOrders = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/orders', {
            prod: products,
            pageTitle: 'Orders Page',
            path: '/shop/orders',
            hasProduct: products.length > 0,
            Productcss: true,
            hasShopActive: true,
        })
    });
}

module.exports.getCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            prod: products,
            pageTitle: 'Checkout Page',
            path: '/shop/checkout',
            hasProduct: products.length > 0,
            Productcss: true,
            hasShopActive: true,
        })
    });
}