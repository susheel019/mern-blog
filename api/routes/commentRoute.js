const express = require("express");
const verifyUser = require("../utils/verifyUser");
const commentController = require('../controllers/commentController')

const router = express.Router();
router.post('/create' ,verifyUser.verifyToken, commentController.createComment);
router.get('/getpostcomments/:postId' , verifyUser.verifyToken , commentController.getPostComments);
router.put('/likecomment/:commentId' , verifyUser.verifyToken , commentController.likeComment)
router.put('/editedcomment/:commentId' , verifyUser.verifyToken , commentController.editComment )
router.delete('/deletecomment/:commentId' , verifyUser.verifyToken , commentController.deleteComment)
router.get('/getcomments' ,verifyUser.verifyToken, commentController.getComments)
module.exports = router