import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Chair,
  TableBar,
  Weekend,
  Bed,
  Kitchen,
  Phone,
  Email,
  LocationOn,
  ArrowBack
} from '@mui/icons-material';

function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const { furnitureDetails } = location.state || {};

  const getFurnitureIcon = (type) => {
    switch (type) {
      case 'chair':
        return <Chair />;
      case 'table':
        return <TableBar />;
      case 'sofa':
        return <Weekend />;
      case 'bed':
        return <Bed />;
      case 'cabinet':
        return <Kitchen />;
      default:
        return <Chair />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f5f5f5',
      py: 4,
      px: 2
    }}>
      <Paper 
        elevation={3}
        sx={{ 
          maxWidth: 800,
          mx: 'auto',
          p: 4,
          bgcolor: '#ffffff'
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Designer
        </Button>

        <Typography variant="h4" sx={{ mb: 4, color: '#1976d2', fontWeight: 'bold' }}>
          Furniture Details
        </Typography>

        {furnitureDetails ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getFurnitureIcon(furnitureDetails.type)}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {furnitureDetails.type.charAt(0).toUpperCase() + furnitureDetails.type.slice(1)}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {furnitureDetails.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                    Specifications
                  </Typography>

                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Style"
                        secondary={furnitureDetails.style}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Dimensions"
                        secondary={`Width: ${furnitureDetails.dimensions.width}m, Length: ${furnitureDetails.dimensions.length}m, Depth: ${furnitureDetails.dimensions.depth}m`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Materials"
                        secondary={`Wood: ${furnitureDetails.materials.wood}, Metal: ${furnitureDetails.materials.metal}, Fabric: ${furnitureDetails.materials.fabric}, Glass: ${furnitureDetails.materials.glass}`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Contact Information
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone"
                        secondary="+1 (555) 123-4567"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Email color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email"
                        secondary="custom@furniture.com"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Address"
                        secondary="123 Furniture Street, Design District, City, Country"
                      />
                    </ListItem>
                  </List>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    Our team will contact you within 24 hours to discuss your custom furniture requirements and provide a detailed quote.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="body1" color="error">
            No furniture details available. Please return to the designer and try again.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Contact; 