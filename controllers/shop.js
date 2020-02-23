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
    req.user.getCart()
        .then(cart => {
            console.log('cart', cart);
            return cart.getProducts({where:{id:prodId}});
        })
        .then(product=>{
            const productInCart=product[0];
            return productInCart.cartItem.destroy();
        })
        .then(result=>{
            console.log(result);
            res.redirect('/cart');
          })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getOrders = (req, res, next) => {

    req.user.getOrders({include:['products']})
    .then(orders=>{
        console.log(orders);
        res.render('shop/orders',{
            order: orders,
            pageTitle: 'Checkout Page',
            path: '/shop/checkout',
            hasOrder: orders.length > 0,
            Productcss: true,
            hasShopActive: true,
        });
    });
}

module.exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart=cart;
            return cart.getProducts();
        })
        .then(products=>{
            return req.user
            .createOrder()
            .then(order=>{
                return order.addProducts(
                    products.map(product=>{
                    product.orderItem={quantity:product.cartItem.quantity}
                    return product;
                }));   
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .then(result=>{
                console.log(result);
                return fetchedCart.setProducts();
            })
        .then(result=>{
            res.redirect('/orders')
        })
        .catch(err=>{
                console.log('Failed creatind order',err);
            })
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