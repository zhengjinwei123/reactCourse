import Router from 'koa-router'
import Covert from 'koa-convert';
import user from '../controllers/user'

const router = new Router({prefix: '/user'});

router.get("/login",Covert(user.login));

export default router
