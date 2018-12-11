const formidable = require("formidable");
const { promisify } = require('util');
const path  = require('path');
const fs = require('fs');
const config = require('../config');

exports.uploadModel = async (ctx) => {
    console.log('body的log', ctx.request.body);
    console.log('files的log', ctx.request.files);
    const file = ctx.request.files.image;
    const reader = fs.createReadStream(file.path);	// 创建可读流

    const ext = file.name.split('.').pop();
    const fileName = `${Math.random().toString()}.${ext}`;
    const filePath = path.join(__dirname, '..', 'upload', `${fileName}`);

    const upStream = fs.createWriteStream(filePath); // 创建可写流
    reader.pipe(upStream);
    return ctx.success({
        url: `http://${config.HOST}:${config.PORT}/${fileName}`,
    }, 200);
}
