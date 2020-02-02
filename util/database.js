const mysql=require('mysql2');

const connPool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'root'
});

module.exports=connPool.promise();