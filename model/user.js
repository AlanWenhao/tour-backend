const { getUserList, setAdmin, cancelAdmin } = require('../lib/mysql');

exports.getUserListModel = async (ctx) => {
    try {
        const data = await getUserList();
        ctx.success(data, 200);
    } catch(err) {
        console.log(err);
        ctx.error(err, 500);
    }
}

exports.changeAdminModel = async (ctx) => {
    const { type, id } = ctx.request.body;
    try {
        if (type === 1) await setAdmin(id);
        else await cancelAdmin(id);
        ctx.success('修改成功', 200);
    } catch(err) {
        console.log(err);
        ctx.error(err, 500);
    }
}
