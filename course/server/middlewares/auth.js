async function auth(ctx,next){
    if(ctx.session && ctx.session.user){
        await next();
    }else{
        await ctx.redirect("/index");
    }
}

export default auth;
