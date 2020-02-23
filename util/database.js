const Sequelize = require("sequelize").Sequelize

// const connPool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'root'
// });

//creating an instance of sequelize
const sequelize=new Sequelize('node-complete','root','root',{dialect:'mysql',host:'localhost'});

//module.exports=connPool.promise();
module.exports=sequelize;