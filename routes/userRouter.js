const userRouter = require('express').Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/userCtrl')


userRouter.get('/search',auth,userCtrl.searchUsers);

userRouter.get('/user/:id',auth,userCtrl.getUser);

userRouter.patch('/user',auth,userCtrl.updateUser);     // patch is used for update only some fields of entry

userRouter.patch('/user/:id/follow',auth,userCtrl.follow);   

userRouter.patch('/user/:id/unfollow',auth,userCtrl.unFollow);  

userRouter.get('/user_post/:id',auth,userCtrl.getUserPosts); 

userRouter.get('/suggestions_user',auth,userCtrl.suggestionsUser); 



module.exports = userRouter