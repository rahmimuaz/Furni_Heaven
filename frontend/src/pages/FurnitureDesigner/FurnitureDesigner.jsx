import React, { useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, TextField, Paper, Typography, Divider, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SimpleModel from './SimpleModel.jsx';
import { materialColors } from '../utils/materialColors';
import { useNavigate } from 'react-router-dom';

function FurnitureDesigner() {
  const navigate = useNavigate();
  const [selectedFurniture, setSelectedFurniture] = useState('chair');
  const [selectedChairType, setSelectedChairType] = useState('office');
  const [selectedTableType, setSelectedTableType] = useState('dining');
  const [selectedSofaType, setSelectedSofaType] = useState('modern');
  const [selectedBedType, setSelectedBedType] = useState('queen');
  const [selectedCabinetType, setSelectedCabinetType] = useState('modern');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [width, setWidth] = useState(1);
  const [length, setLength] = useState(1);
  const [depth, setDepth] = useState(1);
  
  // Material color states
  const [woodColor, setWoodColor] = useState('oak');
  const [metalColor, setMetalColor] = useState('chrome');
  const [fabricColor, setFabricColor] = useState('cotton');
  const [glassColor, setGlassColor] = useState('clear');

  const furnitureTypes = [
    'chair', 'table', 'sofa', 'bookshelf', 'bed', 'cabinet', 'desk', 'wardrobe', 'coffee_table', 'tv_stand'
  ];

  const chairTypes = ['office', 'dining', 'rocking', 'armchair'];
  const tableTypes = ['dining', 'coffee', 'console'];
  const sofaTypes = ['modern', 'classic'];
  const bedTypes = ['queen', 'king'];
  const cabinetTypes = ['modern', 'classic', 'kitchen', 'bathroom', 'walk-in'];
  const styles = ['modern', 'classic', 'rustic', 'industrial', 'minimalistic'];

  // Furniture descriptions
  const furnitureDescriptions = {
    chair: {
      office: "Modern office chair with ergonomic design, adjustable height, and comfortable padding. Perfect for long working hours.",
      dining: "Elegant dining chair with sturdy construction and comfortable seating. Ideal for family gatherings and dinner parties.",
      rocking: "Classic rocking chair with smooth motion and comfortable cushioning. Perfect for relaxation and reading.",
      armchair: "Comfortable armchair with plush cushioning and supportive armrests. Great for living rooms and reading nooks."
    },
    table: {
      dining: "Spacious dining table with elegant design and durable construction. Perfect for family meals and entertaining guests.",
      coffee: "Modern coffee table with sleek design and ample surface area. Ideal for living rooms and casual gatherings.",
      console: "Stylish console table with multiple shelves. Perfect for entryways and living room storage."
    },
    sofa: {
      modern: "Contemporary sofa with clean lines and comfortable seating. Features premium fabric and sturdy frame.",
      classic: "Traditional sofa with elegant design and plush cushioning. Perfect for formal living rooms."
    },
    bed: {
      queen: "Comfortable queen-size bed with sturdy frame and premium mattress support. Includes headboard and storage options.",
      king: "Spacious king-size bed with luxurious design and premium features. Perfect for master bedrooms."
    },
    cabinet: {
      modern: "Contemporary cabinet with glass doors and sleek design. Features adjustable shelves and ample storage.",
      classic: "Traditional cabinet with wooden doors and elegant details. Perfect for formal living spaces.",
      kitchen: "Functional kitchen cabinet with multiple compartments and drawers. Includes adjustable shelves and storage solutions.",
      bathroom: "Compact bathroom cabinet with mirror and storage space. Features shelves and drawers for toiletries.",
      'walk-in': "Spacious walk-in closet with multiple hanging rods and shelves. Includes shoe racks and accessory storage."
    }
  };

  const handleFurnitureChange = (event) => {
    setSelectedFurniture(event.target.value);
  };

  const handleChairTypeChange = (event) => {
    setSelectedChairType(event.target.value);
  };

  const handleTableTypeChange = (event) => {
    setSelectedTableType(event.target.value);
  };

  const handleSofaTypeChange = (event) => {
    setSelectedSofaType(event.target.value);
  };

  const handleBedTypeChange = (event) => {
    setSelectedBedType(event.target.value);
  };

  const handleCabinetTypeChange = (event) => {
    setSelectedCabinetType(event.target.value);
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleWidthChange = (event) => {
    setWidth(Number(event.target.value));
  };

  const handleLengthChange = (event) => {
    setLength(Number(event.target.value));
  };

  const handleDepthChange = (event) => {
    setDepth(Number(event.target.value));
  };

  const handleWoodColorChange = (event) => {
    setWoodColor(event.target.value);
  };

  const handleMetalColorChange = (event) => {
    setMetalColor(event.target.value);
  };

  const handleFabricColorChange = (event) => {
    setFabricColor(event.target.value);
  };

  const handleGlassColorChange = (event) => {
    setGlassColor(event.target.value);
  };

  const getFurnitureDescription = () => {
    const baseDescription = furnitureDescriptions[selectedFurniture];
    if (!baseDescription) return "Custom furniture piece with premium materials and craftsmanship.";
    
    if (selectedFurniture === 'chair') {
      return baseDescription[selectedChairType] || "Custom chair design with premium materials.";
    } else if (selectedFurniture === 'table') {
      return baseDescription[selectedTableType] || "Custom table design with premium materials.";
    } else if (selectedFurniture === 'sofa') {
      return baseDescription[selectedSofaType] || "Custom sofa design with premium materials.";
    } else if (selectedFurniture === 'bed') {
      return baseDescription[selectedBedType] || "Custom bed design with premium materials.";
    } else if (selectedFurniture === 'cabinet') {
      return baseDescription[selectedCabinetType] || "Custom cabinet design with premium materials.";
    }
    
    return baseDescription || "Custom furniture piece with premium materials and craftsmanship.";
  };

  const handleContactClick = () => {
    const furnitureDetails = {
      type: selectedFurniture,
      style: selectedStyle,
      dimensions: {
        width,
        length,
        depth
      },
      materials: {
        wood: woodColor,
        metal: metalColor,
        fabric: fabricColor,
        glass: glassColor
      },
      description: getFurnitureDescription()
    };

    navigate('/contact', { state: { furnitureDetails } });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Paper 
        elevation={3}
        sx={{ 
          width: 350, 
          p: 3, 
          borderRight: '1px solid #e0e0e0',
          bgcolor: '#ffffff',
          overflowY: 'auto',
          '& .MuiFormControl-root': {
            mb: 2.5
          },
          '& .MuiInputLabel-root': {
            color: '#666'
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2196f3'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196f3'
            }
          },
          '& .MuiSelect-select': {
            color: '#333'
          }
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Furniture Designer
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Furniture Type</InputLabel>
          <Select
            value={selectedFurniture}
            label="Furniture Type"
            onChange={handleFurnitureChange}
          >
            {furnitureTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Style</InputLabel>
          <Select
            value={selectedStyle}
            label="Style"
            onChange={handleStyleChange}
          >
            {styles.map(style => (
              <MenuItem key={style} value={style}>
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mb: 1, color: '#666', fontWeight: 'medium' }}>
          Dimensions
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Width"
            type="number"
            value={width}
            onChange={handleWidthChange}
            inputProps={{ min: 0.1, max: 10, step: 0.1 }}
            sx={{ mb: 1.5 }}
          />
          <TextField
            fullWidth
            label="Length"
            type="number"
            value={length}
            onChange={handleLengthChange}
            inputProps={{ min: 0.1, max: 10, step: 0.1 }}
            sx={{ mb: 1.5 }}
          />
          <TextField
            fullWidth
            label="Depth"
            type="number"
            value={depth}
            onChange={handleDepthChange}
            inputProps={{ min: 0.1, max: 10, step: 0.1 }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1, color: '#666', fontWeight: 'medium' }}>
          Material Colors
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Wood Finish</InputLabel>
          <Select
            value={woodColor}
            label="Wood Finish"
            onChange={handleWoodColorChange}
          >
            {Object.keys(materialColors.wood).map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Metal Finish</InputLabel>
          <Select
            value={metalColor}
            label="Metal Finish"
            onChange={handleMetalColorChange}
          >
            {Object.keys(materialColors.metal).map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Fabric Type</InputLabel>
          <Select
            value={fabricColor}
            label="Fabric Type"
            onChange={handleFabricColorChange}
          >
            {Object.keys(materialColors.fabric).map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Glass Type</InputLabel>
          <Select
            value={glassColor}
            label="Glass Type"
            onChange={handleGlassColorChange}
          >
            {Object.keys(materialColors.glass).map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedFurniture === 'chair' && (
          <FormControl fullWidth>
            <InputLabel>Chair Type</InputLabel>
            <Select
              value={selectedChairType}
              label="Chair Type"
              onChange={handleChairTypeChange}
            >
              {chairTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedFurniture === 'table' && (
          <FormControl fullWidth>
            <InputLabel>Table Type</InputLabel>
            <Select
              value={selectedTableType}
              label="Table Type"
              onChange={handleTableTypeChange}
            >
              {tableTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedFurniture === 'sofa' && (
          <FormControl fullWidth>
            <InputLabel>Sofa Type</InputLabel>
            <Select
              value={selectedSofaType}
              label="Sofa Type"
              onChange={handleSofaTypeChange}
            >
              {sofaTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedFurniture === 'bed' && (
          <FormControl fullWidth>
            <InputLabel>Bed Type</InputLabel>
            <Select
              value={selectedBedType}
              label="Bed Type"
              onChange={handleBedTypeChange}
            >
              {bedTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedFurniture === 'cabinet' && (
          <FormControl fullWidth>
            <InputLabel>Cabinet Type</InputLabel>
            <Select
              value={selectedCabinetType}
              label="Cabinet Type"
              onChange={handleCabinetTypeChange}
            >
              {cabinetTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1, color: '#666', fontWeight: 'medium' }}>
          Description
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            bgcolor: '#f8f9fa',
            borderRadius: 1,
            minHeight: 100
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {getFurnitureDescription()}
          </Typography>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleContactClick}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          Contact for Customization
        </Button>
      </Paper>

      <Box sx={{ 
        flex: 1, 
        position: 'relative',
        bgcolor: '#fafafa'
      }}>
        <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          <SimpleModel
            type={selectedFurniture}
            scale={1}
            selectedChairType={selectedChairType}
            selectedTableType={selectedTableType}
            selectedSofaType={selectedSofaType}
            selectedBedType={selectedBedType}
            selectedCabinetType={selectedCabinetType}
            style={selectedStyle}
            width={width}
            length={length}
            depth={depth}
            woodColor={woodColor}
            metalColor={metalColor}
            fabricColor={fabricColor}
            glassColor={glassColor}
          />
          <OrbitControls />
        </Canvas>
      </Box>
    </Box>
  );
}

export default FurnitureDesigner; 