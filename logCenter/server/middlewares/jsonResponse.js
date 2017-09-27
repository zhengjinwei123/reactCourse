async function jsonSend(ctx,next){
    ctx.jsonSend = function(err,data){
        ctx.body = {
            error:err,
            data:data || {}
        };
    };
    await next();
}

export default jsonSend;
