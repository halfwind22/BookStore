const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        Formscss: true,
        Productcss: true,
        hasAdminActive: false,
        editing: false
    });
};

module.exports.postAddProduct = (req, res, next) => {
    const id = null;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, description, price);
    product.save()
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getEditProduct = (req, res, next) => {

    const edit_flag = req.query.edit;

    if (!edit_flag) {
        return res.redirect('/');
    }
    const productId = req.params.productId;

    Product.fetchProductById(productId, (product) => {

        if (!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/add-product',
            Formscss: true,
            Productcss: true,
            hasAdminActive: false,
            editing: edit_flag,
            prod: product
        });
    })

};

module.exports.postUpdateProduct = (req, res, next) => {

    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');

}

module.exports.deleteProduct = (req, res, next) => {
    const id = req.body.productId;
    console.log('ID', id);
    Product.deleteById(id)
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, metadata]) => {
        res.render('admin/products', {
            prod: rows,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProduct: rows.length > 0,
            Productcss: true,
            hasAdminActive: true,
        })
    })
    .catch(err => {
        console.log(err);
    });
}