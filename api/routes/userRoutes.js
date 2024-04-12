const express = require('express');
const userController = require('../controllers/userController')
const verifyUser = require('../utils/verifyUser');

const router = express.Router()
router.get('/' , userController.test);
router.put('/update/:userId' , verifyUser.verifyToken , userController.updateUser);
router.delete('/delete/:userId', verifyUser.verifyToken ,userController.deleteUser );
router.post('/signout' , userController.signout);
router.get('/getusers' , verifyUser.verifyToken , userController.getusers);
// router.delete('/deleteusers' , verifyUser.verifyToken , userController.deleteUser)
router.get('/:userId' , userController.getUser)
module.exports = router;