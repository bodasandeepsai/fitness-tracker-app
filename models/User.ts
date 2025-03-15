import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user',
  },
  profile: {
    height: Number,
    weight: Number,
    age: Number,
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'very', 'extra'],
    },
    fitnessGoals: [String],
    dietaryRestrictions: [String],
  },
  oauth: {
    google: {
      id: String,
      accessToken: String,
    },
  },
}, {
  timestamps: true,
});

// Method to compare password (direct comparison)
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return candidatePassword === this.password;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;