/**
 * Created by Administrator on 2014/8/17.
 */
var pool = require("./db.js"),
markdown = require('markdown').markdown;
function Post(name,title,post){
    this.name = name;
    this.title = title;
    this.post = post;
}
module.exports = Post;
Post.prototype.save = function(callback){
    var date = new Date();
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    var str = JSON.stringify(time);
    var sql = "insert into post(name,title,time,post) values ('"+this.name+"','"+this.title+"','"+str+"','"+this.post+"')";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,res){
            if(err){console.log("QUERY"+err);
                callback(err)}
            console.log("SUCCESS"+res);
            callback(null);
            conn.release();
        })
    })
};
Post.get = function(name,callback){
    var sql = "select * from post WHERE name='" + name + "'";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,rows){
            if(err){
                console.log("QUERY"+err)
            }
            console.log(rows);
            var posts = [];
            var l = rows.length;
            for(var i = 0;i<l;i++){
                //console.log(row);
                var post = {};
                post.name = rows[i].name;
                post.title = rows[i].title;
                post.time = eval('('+rows[i].time+')');
                post.post = rows[i].post;
                posts.push(post);
            }
            posts.forEach(function(post){
                post.post = markdown.toHTML(post.post);
            })
            callback(null,posts);
            conn.release();
        })
    })
}
Post.getOne = function(name,day,title,callback){
    var sql = "select * from post where name='"+name+"' and title='"+title+"' and time LIKE '%"+day+"%'";
    pool.getConnection(function(err,conn){
        if(err){
            console.log("POOL"+err);
        }
        conn.query(sql,function(err,rows){
            if(err){
                console.log("QUERY"+err);
            }
            console.log(rows);
            var post = {};
            post.name = rows[0].name;
            post.title = rows[0].title;
            post.time = eval('('+rows[0].time+')');
            post.post = rows[0].post;
            post.post = markdown.toHTML(post.post);
            callback(null,post);
            conn.release();
        })
    })
}
Post.edit = function(name,day,title,callback){
    var sql = "select * from post where name='"+name+"' and title='"+title+"' and time LIKE '%"+day+"%'";
    pool.getConnection(function(err,conn){
        if(err){
            console.log("POOL"+err);
        }
        conn.query(sql,function(err,rows){
            if(err){
                console.log("QUERY"+err);
            }
            console.log(rows);
            var post = {};
            post.name = rows[0].name;
            post.title = rows[0].title;
            post.time = eval('('+rows[0].time+')');
            post.post = rows[0].post;
           // post.post = markdown.toHTML(post.post);
            callback(null,post);
            conn.release();
        })
    })
}
Post.update = function(name,day,title,post,callback){
    var date = new Date();
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    var str = JSON.stringify(time);
   // UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson'
    var sql = "update post set post = '"+post+"' where name='"+name+"' and title='"+title+"' and time LIKE '%"+day+"%'";
    //var sql = "insert into post(name,title,time,post) values ('"+name+"','"+title+"','"+str+"','"+post+"')";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,res){
            if(err){console.log("QUERY"+err);
                callback(err)}
            console.log("SUCCESS"+res);
            callback(null);
            conn.release();
        })
    })
}
Post.remove = function(name,day,title,callback){
    var sql = "delete from post where name='"+name+"' and title='"+title+"' and time LIKE '%"+day+"%'";
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)};
        conn.query(sql,function(err,res){
            if(err){console.log("QUERY"+err);
            callback(err)}else{console.log("SUCCESS"+res);
                callback(null);}
            conn.release();
        })
    })
}