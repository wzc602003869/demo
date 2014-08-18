/**
 * Created by Administrator on 2014/8/17.
 */
var pool = require("./db.js");
function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
module.exports = User;
User.prototype.save = function(callback){
    user = {
        name:this.name,
        password:this.password,
        email:this.email
    }
    var sql = "insert into user(name,password,email) values ('"+this.name+"','"+this.password+"','"+this.email+"')";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,res){
            if(err){console.log("QUERY"+err);
            callback(err)}
            console.log("SUCCESS"+res);
            callback(null,user);
        })
    })
}
User.get = function(name,callback){
    var sql = "SELECT * FROM user WHERE name='" + name + "'";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,rows){
            var user={};
            if(err){console.log("QUERY"+err)};
            //console.log(rows);
            //console.log(rows!=[]);
            if(rows.length!=0){
                user.name = rows[0].name;
                user.password = rows[0].password;
                user.email = rows[0].email;
                console.log(user);
            }
            console.log(user);
            callback(null,user);
        })
    })
}