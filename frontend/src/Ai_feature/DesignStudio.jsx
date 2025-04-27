import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  IconButton,
  Alert,
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Box as ThreeBox, Plane } from '@react-three/drei';
import axios from 'axios';

const FurnitureItem = ({ position, rotation, scale, color }) => {
  return (
    <ThreeBox position={position} rotation={rotation} scale={scale}>
      <meshStandardMaterial color={color} />
    </ThreeBox>
  );
};

const Room = ({ dimensions }) => {
  const { width, length, height } = dimensions;
  return (
    <>
      {/* Floor */}
      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[width, length]}
      >
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>
      {/* Walls */}
      <Plane position={[0, height / 2, -length / 2]} args={[width, height]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Plane>
      <Plane
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        args={[length, height]}
      >
        <meshStandardMaterial color="#e0e0e0" />
      </Plane>
    </>
  );
};

const DesignStudio = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [furniture, setFurniture] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [roomDimensions, setRoomDimensions] = useState({
    width: 10,
    length: 10,
    height: 3,
  });
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDesign();
    } else if (location.state?.generatedDesign) {
      // Handle AI-generated design
      setDesign(location.state.generatedDesign);
      setRoomDimensions(location.state.generatedDesign.dimensions || roomDimensions);
      setFurniture(location.state.generatedDesign.furniture || []);
      setLoading(false);
    }
  }, [id, location.state]);

  const fetchDesign = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/designs/${id}`);
      setDesign(response.data);
      setFurniture(response.data.furniture || []);
      setRoomDimensions(response.data.dimensions || roomDimensions);
    } catch (error) {
      setError('Failed to fetch design. Please try again.');
      console.error('Error fetching design:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const designData = {
        name: design?.name || 'New Design',
        description: design?.description || '',
        roomType: design?.roomType || 'living-room',
        dimensions: roomDimensions,
        furniture,
      };

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/designs/${id}`, designData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/designs`, designData);
      }
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to save design. Please try again.');
      console.error('Error saving design:', error);
    }
  };

  const handleAiRecommendation = async () => {
    setAiLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/designs/ai-recommendation`,
        {
          roomType: design?.roomType || 'living-room',
          dimensions: roomDimensions,
          prompt: aiPrompt,
        }
      );

      // Update the design with AI recommendations
      setDesign(prev => ({
        ...prev,
        name: prev?.name || 'AI Generated Design',
        description: response.data.recommendation,
      }));
      
      // Update furniture and dimensions
      setFurniture(response.data.furniture || []);
      if (response.data.dimensions) {
        setRoomDimensions(response.data.dimensions);
      }

      // Show success message
      setError('Design updated with AI recommendations!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to get AI recommendation. Please try again.');
      console.error('Error getting AI recommendation:', error);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {/* 3D View */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '80vh' }}>
            <Canvas>
              <PerspectiveCamera makeDefault position={[5, 5, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Room dimensions={roomDimensions} />
              {furniture.map((item, index) => (
                <FurnitureItem key={index} {...item} />
              ))}
              <OrbitControls />
            </Canvas>
          </Paper>
        </Grid>

        {/* Controls */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Room Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Design Name"
                  value={design?.name || ''}
                  onChange={(e) =>
                    setDesign({ ...design, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={design?.description || ''}
                  onChange={(e) =>
                    setDesign({ ...design, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    value={design?.roomType || 'living-room'}
                    onChange={(e) =>
                      setDesign({ ...design, roomType: e.target.value })
                    }
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
                <Typography gutterBottom>Room Dimensions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Width (m)"
                      type="number"
                      value={roomDimensions.width}
                      onChange={(e) =>
                        setRoomDimensions({
                          ...roomDimensions,
                          width: parseFloat(e.target.value),
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Length (m)"
                      type="number"
                      value={roomDimensions.length}
                      onChange={(e) =>
                        setRoomDimensions({
                          ...roomDimensions,
                          length: parseFloat(e.target.value),
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Height (m)"
                      type="number"
                      value={roomDimensions.height}
                      onChange={(e) =>
                        setRoomDimensions({
                          ...roomDimensions,
                          height: parseFloat(e.target.value),
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="AI Design Prompt"
                  multiline
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAiRecommendation}
                  disabled={aiLoading}
                  sx={{ mt: 2 }}
                >
                  {aiLoading ? 'Getting AI Recommendation...' : 'Get AI Recommendation'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  fullWidth
                >
                  Save Design
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DesignStudio; 