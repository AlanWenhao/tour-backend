const data = (ctx, code) => {
    if (code === 200) {
        return (data) => {
            return ctx.body = {
                code: code,
                data
            }
        }
    } else {
        return (msg) => {
            return ctx.body = {
                code: code,
                msg
            }
        }
    }
        
}

module.exports = async (ctx, next) => {
    if (!ctx.success) {
        ctx.success = data(ctx, 200);
    }
    if (!ctx.error) {
        ctx.error = data(ctx, 500);
    }
    await next();
}
