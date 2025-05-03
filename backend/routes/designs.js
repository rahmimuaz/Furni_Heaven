import express from 'express';
import { 
  getDesigns, 
  getDesign, 
  createDesign, 
  updateDesign, 
  deleteDesign, 
  generateAiRecommendation 
} from '../controllers/designController.js';
import Design from '../models/Design.js';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Public routes
router.get('/', getDesigns);
router.get('/:id', getDesign);
router.post('/', createDesign);
router.put('/:id', updateDesign);
router.delete('/:id', deleteDesign);
router.post('/ai-recommendation', generateAiRecommendation);

// (Note: You had two POST /ai-recommendation, so I kept this second one separately, but usually it should be merged carefully)

router.post('/ai-recommendation', async (req, res) => {
  try {
    const { roomType, dimensions, prompt } = req.body;
    
    if (!roomType || !dimensions) {
      return res.status(400).json({ message: 'Room type and dimensions are required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert interior designer. Provide furniture recommendations based on the room description and dimensions."
        },
        {
          role: "user",
          content: `Room type: ${roomType}, Dimensions: ${dimensions.width}x${dimensions.length}x${dimensions.height}m, Description: ${prompt || ''}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const recommendation = completion.choices[0].message.content;

    const furnitureItems = [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: '#8B4513',
      },
      {
        position: [2, 0, 2],
        rotation: [0, Math.PI / 4, 0],
        scale: [1.2, 1, 1.2],
        color: '#DEB887',
      },
    ];

    res.json({
      recommendation,
      furniture: furnitureItems,
      dimensions: dimensions,
      roomType: roomType,
    });
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    res.status(500).json({
      message: 'Error getting AI recommendation',
      error: error.message
    });
  }
});

export default router;
