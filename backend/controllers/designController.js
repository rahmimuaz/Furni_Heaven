import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import Design from '../models/Design.js';
import OpenAI from 'openai';

// Create OpenAI client AFTER dotenv config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get all designs
export const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find();
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single design
export const getDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new design
export const createDesign = async (req, res) => {
  try {
    const design = await Design.create(req.body);
    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a design
export const updateDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a design
export const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get AI recommendations for a design
export const generateAiRecommendation = async (req, res) => {
  try {
    const { roomType, dimensions, description } = req.body;

    if (!roomType || !dimensions) {
      return res.status(400).json({ message: 'Room type and dimensions are required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert interior designer. Provide furniture recommendations based on the room description and dimensions. Include specific furniture items with their dimensions and placement suggestions."
        },
        {
          role: "user",
          content: `Room type: ${roomType}, Dimensions: ${dimensions.width}x${dimensions.length}x${dimensions.height}m, Description: ${description || ''}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const recommendation = completion.choices[0].message.content;
    res.json({ recommendation });
  } catch (error) {
    console.error('Error generating AI recommendation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
