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

const ScratchDesignStudio = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [designData, setDesignData] = useState({
    name: '',
    description: '',
    roomType: 'living-room',
    dimensions: {
      width: 10,
      length: 10,
      height: 3,
    },
  });

  const handleChange = (field) => (event) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setDesignData({
        ...designData,
        [parent]: {
          ...designData[parent],
          [child]: parseFloat(event.target.value) || 0,
        },
      });
    } else {
      setDesignData({
        ...designData,
        [field]: event.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/designs`,
        designData
      );

      // Navigate to the design studio with the new design
      navigate(`/design-studio/${response.data._id}`);
    } catch (error) {
      setError('Failed to create design. Please try again.');
      console.error('Error creating design:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Design
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Start with a blank canvas and create your design from scratch
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Design Name"
              value={designData.name}
              onChange={handleChange('name')}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={designData.description}
              onChange={handleChange('description')}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Room Type</InputLabel>
              <Select
                value={designData.roomType}
                onChange={handleChange('roomType')}
                label="Room Type"
                required
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
            <Typography variant="h6" gutterBottom>
              Room Dimensions (meters)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Width"
                  type="number"
                  value={designData.dimensions.width}
                  onChange={handleChange('dimensions.width')}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Length"
                  type="number"
                  value={designData.dimensions.length}
                  onChange={handleChange('dimensions.length')}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Height"
                  type="number"
                  value={designData.dimensions.height}
                  onChange={handleChange('dimensions.height')}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Design'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ScratchDesignStudio; 