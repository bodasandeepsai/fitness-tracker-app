import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  time: String,
  type: String,
  duration: String,
});

const scheduleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  workouts: [workoutSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure a user can only have one schedule per day
scheduleSchema.index({ userId: 1, day: 1 }, { unique: true });

const WorkoutSchedule = mongoose.models.WorkoutSchedule || mongoose.model('WorkoutSchedule', scheduleSchema);

export default WorkoutSchedule; 