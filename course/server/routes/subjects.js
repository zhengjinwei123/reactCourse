import Router from 'koa-router'
import Covert from 'koa-convert';
import Subjects from '../controllers/subjects'

const router = new Router({prefix: '/subjects'});
// subjects/getSubjects

router.get('/getSubjects', Covert(Subjects.getSubjects));

export default router

