// const fs = require('fs');
// const path = require('path');
const basepath = require('../util/path');
const db = require('../util/database');


module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
    static deletefromKart(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }

            const cart = JSON.parse(fileContent);
            let updatedCart = { ...cart };
            const existingProduct = cart.products.find(p => p.id === id);
            if(!existingProduct)
            {
                return;
            }
            const qtyToBeDeleted = existingProduct.qty;
            updatedCart.totalPrice = (updatedCart.totalPrice - (productPrice * qtyToBeDeleted));
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getProductsFromKart()
    {
        return db.execute('SELECT * FROM products');
    }

}
