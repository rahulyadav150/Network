const auth = require('../middleware/auth')
const postCtrl = require('../controllers/postCtrl')
const router=require('express').Router();

router.route('/posts')
  .post(auth,postCtrl.createPost)
  .get(auth,postCtrl.getPosts)

router.route('/post/:id')
 .patch(auth,postCtrl.updatePost)
 .get(auth,postCtrl.getPost)
 .delete(auth,postCtrl.deletePost)

router.route('/post/:id/like')
  .patch(auth,postCtrl.likePost)


router.route('/post/:id/unlike')
  .patch(auth,postCtrl.unLikePost)

router.get('/post_discover',auth,postCtrl.getPostsDicover)

router.patch('/post/:id/save',auth,postCtrl.savePost)
router.patch('/post/:id/unSave',auth,postCtrl.unSavePost)

router.get('/savedPosts',auth,postCtrl.getSavedPosts)

 module.exports = router