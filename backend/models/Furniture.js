const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['chair', 'table', 'sofa', 'cabinet']
  },
  dimensions: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    depth: {
      type: Number,
      required: true
    }
  },
  color: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  modelUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Furniture', furnitureSchema); 