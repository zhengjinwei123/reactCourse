async function jsonSend(ctx,next){
    ctx.jsonSend = function(err,data){
        let res = {
            error:err,
            data:data || {},
            user:ctx.session ? (ctx.session.user) : null
        };
        ctx.body = res;
    };
    await next();
}

export default jsonSend;
