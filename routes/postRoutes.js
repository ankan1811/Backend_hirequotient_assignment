const express = require('express');
const router = express.Router();
const authenticateUser=require('../middlewares/userMiddleware')

// Import the Post controller
const postController = require('../controllers/postController');

// Define routes
router.get('/', authenticateUser,postController.getAllPosts);
router.get('/:postId',authenticateUser, postController.getPostById);
router.get('/:userId',authenticateUser, postController.getPostsByUser);
router.post('/',authenticateUser, postController.createPost);
router.put('/:postId',authenticateUser, postController.updatePost);
router.delete('/:postId',authenticateUser, postController.deletePost);

// Export the router
module.exports = router;
