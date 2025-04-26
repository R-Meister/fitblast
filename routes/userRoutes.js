const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  addWorkout,
  getWorkoutHistory,
} = require('../controllers/userController');

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get('/stats', protect, getUserStats);

router.route('/workout')
  .get(protect, getWorkoutHistory)
  .post(protect, addWorkout);

module.exports = router;
