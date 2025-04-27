import mongoose from 'mongoose';

const furnitureItemSchema = new mongoose.Schema({
  furnitureId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    x: Number,
    y: Number,
    z: Number,
    rotation: Number
  },
  scale: {
    x: Number,
    y: Number,
    z: Number
  }
});

const designSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ['living-room', 'bedroom', 'kitchen', 'bathroom', 'office']
  },
  dimensions: {
    width: Number,
    length: Number,
    height: Number
  },
  furniture: [furnitureItemSchema],
  aiRecommendations: [{
    type: String,
    description: String,
    furniture: [furnitureItemSchema]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
designSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Design = mongoose.model('Design', designSchema);

export default Design;
