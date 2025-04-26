const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      workoutHistory: user.workoutHistory,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.profile) {
      user.profile = {
        ...user.profile,
        ...req.body.profile,
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profile: updatedUser.profile,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add workout to history
// @route   POST /api/users/workout
// @access  Private
const addWorkout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.workoutHistory.push(req.body);
    await user.save();

    res.status(201).json({
      message: 'Workout added successfully',
      workoutHistory: user.workoutHistory,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get workout history
// @route   GET /api/users/workout
// @access  Private
const getWorkoutHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user.workoutHistory);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user workout stats
// @route   GET /api/users/stats
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  // This would be enhanced with actual workout stats
  const stats = {
    totalWorkouts: 0,
    totalDuration: 0,
    favoriteWorkout: 'None',
    caloriesBurned: 0
  };

  res.json(stats);
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  addWorkout,
  getWorkoutHistory,
  getUserStats
};
