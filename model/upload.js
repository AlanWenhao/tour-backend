const asyncBusboy = require('async-busboy');
const path  = require('path');
const fs = require('fs');
const config = require('../config');

exports.uploadModel = async (ctx) => {
    const {files, fields} = await asyncBusboy(ctx.req);
    // console.log('files', JSON.stringify(files));
    // console.log('fields', fields);
    const file = files[0];
    const reader = fs.createReadStream(file.path);	// 创建可读流

    const ext = file.filename.split('.').pop();
    const fileName = `${Math.random().toString()}.${ext}`;
    const filePath = path.join(__dirname, '..', 'upload', `${fileName}`);

    const upStream = fs.createWriteStream(filePath); // 创建可写流
    reader.pipe(upStream);
    return ctx.success({
        url: `http://${config.HOST}:${config.PORT}/${fileName}`,
    }, 200);
}
