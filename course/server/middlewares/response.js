async function send(ctx,next){
    ctx.send = function(err,data){
        let res = {
            error:err,
            data:data,
            user:ctx.session ? (ctx.session.user) : null
        };
        ctx.body = JSON.stringify(res);
    };
    await next();
}

export default send;
