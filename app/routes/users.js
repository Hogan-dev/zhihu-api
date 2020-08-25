// const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const usersCtl = require('../controllers/users');
const { secret } = require('../config');
const { checkOwner } = require('../controllers/users');
const { checkTopicExist } = require('../controllers/topics');
// const auth = async(ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   const token = authorization.replace('Bearer ', '');
//   try {
//     const user = jsonwebtoken.verify(token, secret);
//     ctx.state.user = user;
//   } catch (err) {
//     ctx.throw(401, err.message);
//   }
//   await next();
// }
const auth = jwt({ secret });

router.get('/', usersCtl.find);

router.post('/', usersCtl.create);

router.get('/:id', usersCtl.findById);

router.patch('/:id', auth, usersCtl.checkOwner, usersCtl.update);

router.delete('/:id', auth, usersCtl.checkOwner, usersCtl.delete);

router.post('/login', usersCtl.login);

router.get('/:id/following', usersCtl.listFollowing);

router.get('/:id/followers', usersCtl.listFollowers);

router.put('/following/:id', auth, usersCtl.checkUserExist, usersCtl.follow);

router.delete('/following/:id', auth, usersCtl.checkUserExist, usersCtl.unfollow);

router.get('/:id/followingTopics', usersCtl.listFollowingTopics);

router.put('/followingTopics/:id', auth, checkTopicExist, usersCtl.followTopic);

router.delete('/followingTopics/:id', auth, checkTopicExist, usersCtl.unfollowTopic);

module.exports = router;