const express = require("express");
const verifyUser = require("../utils/verifyUser");
const postController = require("../controllers/postController");

const router = express.Router();
router.post("/create", verifyUser.verifyToken, postController.create);
router.get("/getposts" , postController.getposts);
router.delete('/deletepost/:postId/:userId' , verifyUser.verifyToken , postController.deletepost)
router.put('/updatedpost/:postId/:userId' , verifyUser.verifyToken , postController.updatepost);
router
module.exports = router;