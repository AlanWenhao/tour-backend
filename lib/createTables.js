const { createTables } = require('./mysql');

createTables().then(() => {
    console.log('tables 创建完成');
    process.exit();
}, () => {
    console.log('tables 创建失败！');
    process.exit();
});

