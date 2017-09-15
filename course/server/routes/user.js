import Router from 'koa-router'
import Covert from 'koa-convert';
import user from '../controllers/user'

const router = new Router({prefix: '/user'});

router.get('/getUserInfo', Covert(user.getUserInfo));
router.post("/login",Covert(user.login));
router.post("/register",Covert(user.register));
router.get("/logout",Covert(user.logout));

export default router
