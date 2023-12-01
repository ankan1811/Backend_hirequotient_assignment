const UserProfile = require('../models/userprofileModel');

// Create user profile
const createUserProfile = async (req, res) => {
  const { userId, fullName, bio } = req.body;

  try {
    const newProfile = new UserProfile({ userId, fullName, bio });
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile by ID
const getUserProfileById = async (req, res) => {
  const profileId = req.params.id;

  try {
    const userProfile = await UserProfile.findById(profileId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const profileId = req.params.id;
  const { fullName, bio } = req.body;

  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      profileId,
      { fullName, bio },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserProfile,
  getUserProfileById,
  updateUserProfile,
};
