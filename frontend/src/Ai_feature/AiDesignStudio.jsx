import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AiDesignStudio = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [designPreferences, setDesignPreferences] = useState({
    style: 'modern',
    colorScheme: 'neutral',
    budget: 'medium',
    roomType: 'living-room',
    description: '',
  });

  const handleChange = (field) => (event) => {
    setDesignPreferences({
      ...designPreferences,
      [field]: event.target.value,
    });
  };

  const handleGenerateDesign = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/designs/ai-recommendation`,
        designPreferences
      );

      // Navigate to the design studio with the generated design
      navigate('/design-studio/new', {
        state: { generatedDesign: response.data.recommendation },
      });
    } catch (error) {
      setError('Failed to generate design. Please try again.');
      console.error('Error generating design:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          AI Design Generator
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Let AI create a personalized interior design based on your preferences
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Room Type</InputLabel>
              <Select
                value={designPreferences.roomType}
                onChange={handleChange('roomType')}
                label="Room Type"
              >
                <MenuItem value="living-room">Living Room</MenuItem>
                <MenuItem value="bedroom">Bedroom</MenuItem>
                <MenuItem value="kitchen">Kitchen</MenuItem>
                <MenuItem value="bathroom">Bathroom</MenuItem>
                <MenuItem value="office">Office</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Style</InputLabel>
              <Select
                value={designPreferences.style}
                onChange={handleChange('style')}
                label="Style"
              >
                <MenuItem value="modern">Modern</MenuItem>
                <MenuItem value="traditional">Traditional</MenuItem>
                <MenuItem value="minimalist">Minimalist</MenuItem>
                <MenuItem value="industrial">Industrial</MenuItem>
                <MenuItem value="scandinavian">Scandinavian</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Color Scheme</InputLabel>
              <Select
                value={designPreferences.colorScheme}
                onChange={handleChange('colorScheme')}
                label="Color Scheme"
              >
                <MenuItem value="neutral">Neutral</MenuItem>
                <MenuItem value="warm">Warm</MenuItem>
                <MenuItem value="cool">Cool</MenuItem>
                <MenuItem value="monochromatic">Monochromatic</MenuItem>
                <MenuItem value="colorful">Colorful</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Budget</InputLabel>
              <Select
                value={designPreferences.budget}
                onChange={handleChange('budget')}
                label="Budget"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="luxury">Luxury</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Preferences"
              placeholder="Describe any specific requirements or preferences (e.g., 'I need a home office space', 'I want to maximize natural light')"
              value={designPreferences.description}
              onChange={handleChange('description')}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGenerateDesign}
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Generate Design'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AiDesignStudio; 