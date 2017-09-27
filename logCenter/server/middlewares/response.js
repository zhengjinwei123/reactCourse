async function send(ctx,next){
    ctx.send = function(err,data){
        let res = {
            error:err,
            data:data || {}
        };
        ctx.body = JSON.stringify(res);
    };
    await next();
}

export default send;
