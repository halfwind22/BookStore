//const http = require('http');
const path=require('path')
const express=require('express');
// const bodyParser=require('body-parser');

var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const adminrouter=require('./routes/admin');
const shoprouter=require('./routes/shop');
const errorrouter=require('./controllers/404');

const app=express();

const sequelize=require('./util/database');
const Product=require('./models/Product');
const User=require('./models/User');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

app.engine('handlebars', exphbs({
    layoutsDir:'views/layouts/',
    defaultLayout:'main-layout'}));
app.set('view engine', 'handlebars');

// app.set('view engine','pug');
// app.set('views','views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
    console.log(err);
    })
})
app.use('/admin', adminrouter.router);
app.use(shoprouter);
// app.use('/users',(req,res,next)=>{
//     console.log('Middleware2');
//     res.send('<h1>Hello from Users</h1>');
// });

// app.use(bodyParser.urlencoded({extended:false}));

// app.get('/add-product',(req,res,next)=>{
//     res.send('<html><body><form action="/product"method="POST">Name:<br><input type="text" name="name"><br><br><input type="submit" value="Add Product"></form></body></html>'); 
// });

// app.post('/product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

// app.use('/',(req,res,next)=>{
//     res.send('<h1>Hello</h1>');
// });
app.use(errorrouter.pageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


sequelize.sync({force:true})
.then(result=>{
    console.log(result);
    return User.findByPk(1);
})
.then(user=>{
    if(!user)
    {
        return User.create({name:'Aravind',emailaddr:'aravindnk22@gmail.com'})
    }
    return user;
})
.then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(5000);
  })
.catch(err=>{
    console.log(err);
})
