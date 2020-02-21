const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getProduct = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prod: products,
                pageTitle: 'All Products',
                path: '/shop/products',
                hasProduct: products.length > 0,
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
    Product.findByPk(productId)
        .then(result => {
            console.log(result);
            res.render('shop/product-detail', {
                prod: result,
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
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prod: products,
                pageTitle: 'BookShop',
                path: '/shop/index',
                hasProduct: products.length > 0,
                Productcss: true,
                hasShopActive: true,
            })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getCart = (req, res, next) => {

    req.user.getCart()
        .then(cart => {
            console.log('cart', cart);
            return cart.getProducts();
        })
        .then(productsInCart => {
            res.render('shop/cart', {
                prod: productsInCart,
                pageTitle: 'Your Cart',
                path: '/shop/cart',
                hasProduct: productsInCart.length > 0,
                Productcss: true,
                hasShopActive: true
            });
        })
        .catch(err => {
            console.log(err);
        });
}


module.exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let qty;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            console.log('cart', cart);
            return cart.getProducts({where:{id:prodId}});
        })
        .then(products => {
            let productInCart;
            if (products.length > 0) {
                productInCart = products[0];
            }
            if (productInCart) {
                qty= productInCart.cartItem.quantity+1;
                return productInCart;
            }
            else {
                qty = 1;
                return Product.findByPk(prodId);
            }
        })
        .then(product => {
            return fetchedCart.addProduct(product,{through: { quantity: qty }});
        })
        .then(() => {
            res.redirect('/cart');
          })
        .catch(err => {
            console.log(err);
        })
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