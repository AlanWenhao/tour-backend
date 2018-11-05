module.exports = (ctx) => {
    return () => {
        ctx.success = async (data) => {
            ctx.body = {
                code: 200,
                data: data
            }
        }

        ctx.res.error = async (message) => {
            ctx.body = {
                code: 500,
                message
            }
        }
    }
}
