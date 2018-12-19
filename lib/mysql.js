const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

const users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(128) NOT NULL COMMENT '用户名',
     password VARCHAR(128) NOT NULL COMMENT '密码',
     is_admin VARCHAR(128) NOT NULL DEFAULT '0' COMMENT '管理员',
     avatar VARCHAR(128) NOT NULL COMMENT '头像',
     moment VARCHAR(128) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`;

const articles = 
    `create table if not exists articles(
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT NOT NULL COMMENT '文章类别',
    title VARCHAR(128) NOT NULL COMMENT '文章题目',
    author VARCHAR(64) NOT NULL COMMENT '文章作者',
    summary TEXT NOT NULL COMMENT '文章摘要',
    content TEXT NOT NULL COMMENT '文章内容',
    moment VARCHAR(128) NOT NULL COMMENT '发布时间',
    pv VARCHAR(64) NOT NULL COMMENT '浏览次数',
    thumb VARCHAR(128) NOT NULL DEFAULT '0' COMMENT '文章点赞数',
    PRIMARY KEY(id)
    )`

// 废弃
const posts =
    `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '文章作者',
    title TEXT(0) NOT NULL COMMENT '评论题目',
    content TEXT(0) NOT NULL COMMENT '评论内容',
    md TEXT(0) NOT NULL COMMENT 'markdown',
    uid VARCHAR(40) NOT NULL COMMENT '用户id',
    moment VARCHAR(100) NOT NULL COMMENT '发表时间',
    comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
    pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
    avatar VARCHAR(100) NOT NULL COMMENT '用户头像',
    PRIMARY KEY(id)
    );`;

const comments =
    `create table if not exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL COMMENT '用户名称',
    content TEXT(0) NOT NULL COMMENT '评论内容',
    moment VARCHAR(40) NOT NULL COMMENT '评论时间',
    postid VARCHAR(40) NOT NULL COMMENT '文章id',
    avatar VARCHAR(100) NOT NULL COMMENT '用户头像',
    PRIMARY KEY(id)
    );`;

const category = 
    `create table if not exists category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL COMMENT '类别',
    picture VARCHAR(64) NOT NULL COMMENT '图片',
    PRIMARY KEY(id)
    )`;

let createTable = (sql) => {
    return query(sql, [])
}

// 建表
exports.createTables = () => {
    return Promise.all([createTable(users), createTable(articles), createTable(comments), createTable(category)]);
}

// 注册用户
exports.insertData = (value) => {
    let _sql = "insert into users set username=?,password=?,is_admin=?,avatar=?,moment=?;"
    return query(_sql, value)
}

// 查找用户
exports.findUserData = (username) => {
    let _sql = `select * from users where username="${username}";`
    return query(_sql)
}

// 添加类别
exports.insertCategory = (value) => {
    let _sql = "insert into category set name=?;"
    return query(_sql, value)
}

// 删除类别
exports.deleteCategory = (id) => {
    let _sql = `delete from category where id="${id}";`
    return query(_sql, id);
}

// 查询类目 
exports.queryCategory = (name) => {
    let _sql;
    if (name) _sql = `select * from category where name="${name}"`
    else _sql = `select * from category`
    return query(_sql, name);
}

// 更改类目名称
exports.editCategory = (value) => {
    let _sql = "update category set name=? where id=?;";
    return query(_sql, value);
}

// 发表文章
exports.insertArticle = (value) => {
    let _sql = "insert into articles set category_id=?,title=?,author=?,summary=?,content=?,moment=?,pv=?,thumb=?;"
    return query(_sql, value)
}

// 删除文章
exports.deleteArticle = (id) => {
    let _sql = `delete from articles where id=${id}`;
    return query(_sql, id);
}

// 跟新文章
exports.updateArticle = (value) => {
    let _sql = "update articles set title=?,summary=?,content=? where id=?";
    return query(_sql, value);
}

// 根据id获取文章
exports.queryArticleById = (id) => {
    let _sql = `select * from articles where id=${id}`;
    return query(_sql);
}

// 分页获取【用户】【分类】文章 
exports.queryAuthorCateArticles = (value) => {
    let _sql = `select * from articles where author=? and category_id=? order by id desc limit ?,?;`
    return query(_sql, value);
}
// 分页获取【分类】文章 
exports.queryCateArticles = (value) => {
    let _sql = `select * from articles where category_id=? order by id desc limit ?,?;`
    return query(_sql, value);
}
// 分页获取【用户】文章 
exports.queryAuthorArticles = (value) => {
    let _sql = `select * from articles where author=? order by id desc limit ?,?;`
    return query(_sql, value);
}

// 分页获取【全部】文章 
exports.queryArticles = (value) => {
    let _sql = `select * from articles order by id desc limit ?,?;`
    return query(_sql, value);
}

// 获取【用户】【分类】文章总数
exports.queryAuthorCateArtNum = (value) => {
    let _sql = `select count(*) as count from articles where author=? and category_id=?;`
    return query(_sql, value);
}
// 获取【用户】文章总数
exports.queryAuthorArtNum = (value) => {
    let _sql = `select count(*) as count from articles where author=?`
    return query(_sql, value);
}
// 获取【分类】文章总数
exports.queryAuthorCateArtNum = (value) => {
    let _sql = `select count(*) as count from articles where category_id=?;`
    return query(_sql, value);
}
// 获取【全部】文章总数
exports.queryArtNum = (value) => {
    let _sql = `select count(*) as count from articles;`
    return query(_sql, value);
}
// 增加浏览量
exports.plusViewTime = (id) => {
    let _sql = `update articles set pv = pv + 1 where id=${id}`;
    return query(_sql);
}
// 增加点赞数
exports.plusThumb = (id) => {
    let _sql = `update articles set thumb = thumb + 1 where id=${id}`;
    return query(_sql);
}






// 删除用户
exports.deleteUserData = (username) => {
    let _sql = `delete from users where username="${username}";`
    return query(_sql)
}

// 增加文章评论数
exports.addPostCommentCount = (value) => {
    let _sql = "update posts set comments = comments + 1 where id=?"
    return query(_sql, value)
}
// 减少文章评论数
exports.reducePostCommentCount = (value) => {
    let _sql = "update posts set comments = comments - 1 where id=?"
    return query(_sql, value)
}

// 更新浏览数
exports.updatePostPv = (value) => {
    let _sql = "update posts set pv= pv + 1 where id=?"
    return query(_sql, value)
}

// 发表评论
exports.insertComment = (value) => {
    let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avatar=?;"
    return query(_sql, value)
}
// 通过名字查找用户
exports.findDataByName = (name) => {
    let _sql = `select * from users where name="${name}";`
    return query(_sql)
}
// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName = (name) => {
    let _sql = `select count(*) as count from users where name="${name}";`
    return query(_sql)
}
// 通过文章的名字查找用户
exports.findDataByUser = (name) => {
    let _sql = `select * from posts where name="${name}";`
    return query(_sql)
}
// 通过文章id查找
exports.findDataById = (id) => {
    let _sql = `select * from posts where id="${id}";`
    return query(_sql)
}
// 通过文章id查找
exports.findCommentById = (id) => {
    let _sql = `select * from comment where postid="${id}";`
    return query(_sql)
}

// 通过文章id查找评论数
exports.findCommentCountById = (id) => {
    let _sql = `select count(*) as count from comment where postid="${id}";`
    return query(_sql)
}

// 通过评论id查找
exports.findComment = (id) => {
    let _sql = `select * from comment where id="${id}";`
    return query(_sql)
}
// 查询所有文章
exports.findAllPost = () => {
    let _sql = `select * from posts;`
    return query(_sql)
}
// 查询所有文章数量
exports.findAllPostCount = () => {
    let _sql = `select count(*) as count from posts;`
    return query(_sql)
}
// 查询分页文章
exports.findPostByPage = (page) => {
    let _sql = ` select * from posts limit ${(page - 1) * 10},10;`
    return query(_sql)
}
// 查询所有个人用户文章数量
exports.findPostCountByName = (name) => {
    let _sql = `select count(*) as count from posts where name="${name}";`
    return query(_sql)
}
// 查询个人分页文章
exports.findPostByUserPage = (name, page) => {
    let _sql = ` select * from posts where name="${name}" order by id desc limit ${(page - 1) * 10},10 ;`
    return query(_sql)
}
// 更新修改文章
exports.updatePost = (values) => {
    let _sql = `update posts set title=?,content=?,md=? where id=?`
    return query(_sql, values)
}
// 删除文章
exports.deletePost = (id) => {
    let _sql = `delete from posts where id = ${id}`
    return query(_sql)
}
// 删除评论
exports.deleteComment = (id) => {
    let _sql = `delete from comment where id=${id}`
    return query(_sql)
}
// 删除所有评论
exports.deleteAllPostComment = (id) => {
    let _sql = `delete from comment where postid=${id}`
    return query(_sql)
}

// 滚动无限加载数据
exports.findPageById = (page) => {
    let _sql = `select * from posts limit ${(page - 1) * 5},5;`
    return query(_sql)
}
// 评论分页
exports.findCommentByPage = (page, postId) => {
    let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page - 1) * 10},10;`
    return query(_sql)
}



