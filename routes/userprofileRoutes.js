const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userprofileController');
const authenticateUser=require('../middlewares/userMiddleware')

// Create user profile
router.post('/',authenticateUser, userProfileController.createUserProfile);

// Get user profile by ID
router.get('/:id',authenticateUser, userProfileController.getUserProfileById);

// Update user profile
router.put('/:id', authenticateUser,userProfileController.updateUserProfile);

module.exports = router;
