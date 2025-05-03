import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/designs');
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCreateNew = () => {
    navigate('/design-studio/new');
  };

  const handleEditDesign = (designId) => {
    navigate(`/design-studio/${designId}`);
  };

  const handleDeleteDesign = async (designId) => {
    try {
      await axios.delete(`http://localhost:5000/api/designs/${designId}`);
      fetchDesigns();
    } catch (error) {
      console.error('Error deleting design:', error);
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
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNew}
          sx={{ mb: 2 }}
        >
          Create New Design
        </Button>
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Designs" />
        <Tab label="Recent Activity" />
        <Tab label="Favorites" />
      </Tabs>

      <Grid container spacing={3}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={design.thumbnail || '/images/placeholder.jpg'}
                alt={design.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {design.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {design.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room Type: {design.roomType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(design.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleEditDesign(design._id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteDesign(design._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {designs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No designs found. Create your first design to get started!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard; 