/**
 * Created by Administrator on 2014/8/17.
 */
var mysql = require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    port: 3306
});
module.exports = pool;