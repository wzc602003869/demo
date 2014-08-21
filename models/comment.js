/**
 * Created by Administrator on 2014/8/18.
 */
var pool = require("./db.js");
function Comment(name,day,title,comment){
    this.name = name;
    this.day = day;
    this.title = title;
    this.comment = comment;
}
module.exports = Comment;
Comment.prototype.save = function(callback){
    var sql = "select comments from post where name='"+this.name+"' and title='"+this.title+"' and time LIKE '%"+this.day+"%'";
    var name = this.name,title=this.title,day=this.day,comment=this.comment;
    pool.getConnection(function(err,conn){
        if(err){console.log("POOL"+err)}
        conn.query(sql,function(err,rows){
            if(err){console.log("QUERY"+err)}
            console.log(rows[0].comments);//[]
            console.log(comment);//
            console.log(JSON.parse(rows[0].comments));//[]
            console.log(typeof JSON.parse(rows[0].comments));//object
            console.log(JSON.parse(rows[0].comments) instanceof Array);//false
            var comments = JSON.parse(rows[0].comments);
            comments.push(comment);
            comments = JSON.stringify(comments);
            var sql = "update post set comments = '"+comments+"' where name='"+name+"' and title='"+title+"' and time LIKE '%"+day+"%'";
            console.log(sql);
            conn.query(sql,function(err,rows){
                callback(null);
                conn.release();
            })
        })
    })
}