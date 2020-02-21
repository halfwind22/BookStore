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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description
    })
    .then(result=>{
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
}

module.exports.getEditProduct = (req, res, next) => {

    const edit_flag = req.query.edit;

    if (!edit_flag) {
        return res.redirect('/');
    }
    const productId = req.params.productId;

    //Product.findByPk(productId)
    req.user.getProducts({where:{id:productId}})
    .then(product => {

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
            prod: product[0]
        });
    })

};

module.exports.postUpdateProduct = (req, res, next) => {

    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    //Product.findByPk(id)
    req.user.getProducts()
    .then(products=>{
       const product=products[0];
       product.title=title;
       product.imageUrl = imageUrl;
       product.price = price;
       product.description = description;
       return product.save();
    })
    .then(result=>{
        console.log(result);
        console.log("Updated product successfully");
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })

}

module.exports.deleteProduct = (req, res, next) => {
    const id = req.body.productId;
    console.log('ID', id);
    Product.destroy({where:{id:id}})
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.getProducts = (req, res, next) => {
    //Product.findAll()
    req.user.getProducts()
        .then(products => {
        res.render('admin/products', {
            prod: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            hasProduct: products.length > 0,
            Productcss: true,
            hasAdminActive: true,
        })
    })
    .catch(err => {
        console.log(err);
    });
}