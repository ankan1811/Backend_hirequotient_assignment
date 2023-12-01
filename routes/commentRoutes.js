const express = require('express');
const router = express.Router();
const authenticateUser=require('../middlewares/userMiddleware')
// Import the Comment controller
const commentController = require('../controllers/commentController');

// Define routes
router.get('/',authenticateUser, commentController.getAllComments);
router.get('/:commentId',authenticateUser, commentController.getCommentById);
router.post('/',authenticateUser,commentController.createComment);
router.put('/:commentId',authenticateUser, commentController.updateComment);
router.delete('/:commentId',authenticateUser, commentController.deleteComment);

// Export the router
module.exports = router;
