// const products=[];
// const fs = require('fs');
// const path = require('path');
const basepath = require('../util/path');
const db = require('../util/database');

const Cart = require('./cart');


const getProductsFromFile = (callback) => {
    // return products;
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        else {
            if (typeof fileContent !== 'undefined') {
                callback(JSON.parse(fileContent));
            }
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES(?,?,?,?)',
        [this.title, this.price, this.description, this.imageUrl]);
        

        // .then([rows,metadata]=>
        //     {

        //     }).catch();
        // getProductsFromFile((products) => {
        //     if (this.id) {
        //         const existingIndex = products.findIndex(p => p.id === this.id);
        //         const updatedProductList = [...products];
        //         updatedProductList[existingIndex] = this;
        //         fs.writeFile(p, JSON.stringify(updatedProductList), err => {
        //             console.log(err);
        //         });
        //     }
        //     else {
        //         this.id = Math.random().toString();
        //         products.push(this);
        //         fs.writeFile(p, JSON.stringify(products), err => {
        //             console.log(err);
        //         });
        //     }
        // });
    }

    static deleteById(id) {

        return db.execute('DELETE FROM products where id=?',[id]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM products');

    }

    static fetchProductById(id) {

        return db.execute('SELECT * FROM products where id=?',[id]);
    }
}