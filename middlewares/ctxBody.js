const data = (ctx) => {
    return (data, code) => {
        return ctx.body = {
            code: code,
            data
        }
    }
}

module.exports = async (ctx, next) => {
    if (!ctx.success) {
        ctx.success = data(ctx);
    }
    if (!ctx.error) {
        ctx.error = data(ctx);
    }
    await next();
}
