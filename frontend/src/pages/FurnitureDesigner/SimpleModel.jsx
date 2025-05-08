import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Torus, useTexture } from '@react-three/drei';
import { createWoodTexture, createFabricTexture, createMetalTexture, createGlassTexture } from '../utils/createTexture';
import { getColorFromPalette } from '../utils/colorPalettes';
import { materialColors, getMaterialColor } from '../utils/materialColors';
import * as THREE from 'three';

function SimpleModel({ 
  type, 
  scale, 
  selectedChairType, 
  selectedTableType, 
  selectedSofaType, 
  selectedBedType, 
  selectedCabinetType, 
  style = 'modern',
  width = 1,
  length = 1,
  depth = 1,
  woodColor = 'oak',
  metalColor = 'chrome',
  fabricColor = 'cotton',
  glassColor = 'clear'
}) {
  const meshRef = useRef();
  
  // Generate procedural textures
  const woodTexture = createWoodTexture();
  const fabricTexture = createFabricTexture();
  const metalTexture = createMetalTexture();
  const glassTexture = createGlassTexture();

  // Load textures with error handling
  const textures = {
    wood: woodTexture,
    fabric: fabricTexture,
    metal: metalTexture,
    glass: glassTexture
  };

  // Style-specific color palettes
  const styleColorPalettes = {
    minimalistic: {
      wood: {
        oak: '#E6E6E6',
        walnut: '#D4D4D4',
        mahogany: '#C4C4C4',
        pine: '#F5F5F5',
        cherry: '#E8E8E8'
      },
      metal: {
        chrome: '#FFFFFF',
        brass: '#F0F0F0',
        bronze: '#E8E8E8',
        steel: '#F5F5F5',
        gold: '#FAFAFA'
      },
      fabric: {
        cotton: '#FFFFFF',
        leather: '#F5F5F5',
        velvet: '#F0F0F0',
        linen: '#FAFAFA',
        silk: '#FFFFFF'
      },
      glass: {
        clear: '#FFFFFF',
        frosted: '#F8F8F8',
        tinted: '#F5F5F5',
        smoked: '#F0F0F0',
        colored: '#FAFAFA'
      }
    },
    industrial: {
      wood: {
        oak: '#4A4A4A',
        walnut: '#3D3D3D',
        mahogany: '#2C2C2C',
        pine: '#5C5C5C',
        cherry: '#3A3A3A'
      },
      metal: {
        chrome: '#808080',
        brass: '#6B6B6B',
        bronze: '#5C5C5C',
        steel: '#707070',
        gold: '#8B8B8B'
      },
      fabric: {
        cotton: '#4A4A4A',
        leather: '#3D3D3D',
        velvet: '#2C2C2C',
        linen: '#5C5C5C',
        silk: '#3A3A3A'
      },
      glass: {
        clear: '#808080',
        frosted: '#6B6B6B',
        tinted: '#5C5C5C',
        smoked: '#707070',
        colored: '#8B8B8B'
      }
    },
    classic: {
      wood: {
        oak: '#8B4513',
        walnut: '#654321',
        mahogany: '#800000',
        pine: '#DEB887',
        cherry: '#CD5C5C'
      },
      metal: {
        chrome: '#C0C0C0',
        brass: '#B8860B',
        bronze: '#CD7F32',
        steel: '#A9A9A9',
        gold: '#FFD700'
      },
      fabric: {
        cotton: '#F5F5DC',
        leather: '#8B4513',
        velvet: '#4B0082',
        linen: '#FAF0E6',
        silk: '#FFE4E1'
      },
      glass: {
        clear: '#F0F8FF',
        frosted: '#F5F5F5',
        tinted: '#E6E6FA',
        smoked: '#A9A9A9',
        colored: '#FFE4E1'
      }
    },
    modern: {
      wood: {
        oak: '#2C3E50',
        walnut: '#34495E',
        mahogany: '#2C3E50',
        pine: '#3498DB',
        cherry: '#E74C3C'
      },
      metal: {
        chrome: '#ECF0F1',
        brass: '#BDC3C7',
        bronze: '#95A5A6',
        steel: '#7F8C8D',
        gold: '#F1C40F'
      },
      fabric: {
        cotton: '#FFFFFF',
        leather: '#2C3E50',
        velvet: '#34495E',
        linen: '#ECF0F1',
        silk: '#F5F6FA'
      },
      glass: {
        clear: '#FFFFFF',
        frosted: '#ECF0F1',
        tinted: '#BDC3C7',
        smoked: '#95A5A6',
        colored: '#F5F6FA'
      }
    },
    rustic: {
      wood: {
        oak: '#8B4513',
        walnut: '#654321',
        mahogany: '#8B0000',
        pine: '#A0522D',
        cherry: '#6B4423'
      },
      metal: {
        chrome: '#8B7355',
        brass: '#B8860B',
        bronze: '#CD7F32',
        steel: '#A0522D',
        gold: '#DAA520'
      },
      fabric: {
        cotton: '#DEB887',
        leather: '#8B4513',
        velvet: '#654321',
        linen: '#D2B48C',
        silk: '#CD853F'
      },
      glass: {
        clear: '#F5DEB3',
        frosted: '#DEB887',
        tinted: '#D2B48C',
        smoked: '#A0522D',
        colored: '#CD853F'
      }
    }
  };

  // Helper function to create materials with fallback
  const createMaterial = (colorType, materialType = 'wood', shade = 'medium') => {
    // Get color from style-specific palette
    const stylePalette = styleColorPalettes[style]?.[materialType];
    const color = stylePalette?.[colorType] || getMaterialColor(materialType, colorType, shade);
    const texture = textures[materialType];
    
    // Style-specific material properties
    const styleProperties = {
      minimalistic: {
        wood: { roughness: 0.4, metalness: 0.0, clearcoat: 0.2, clearcoatRoughness: 0.3 },
        metal: { roughness: 0.1, metalness: 0.9, clearcoat: 0.3, clearcoatRoughness: 0.1 },
        fabric: { roughness: 0.6, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
        glass: { roughness: 0.05, metalness: 0.9, clearcoat: 0.5, clearcoatRoughness: 0.1 }
      },
      industrial: {
        wood: { roughness: 0.9, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
        metal: { roughness: 0.7, metalness: 0.8, clearcoat: 0.0, clearcoatRoughness: 0.0 },
        fabric: { roughness: 0.8, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
        glass: { roughness: 0.2, metalness: 0.8, clearcoat: 0.0, clearcoatRoughness: 0.0 }
      },
      classic: {
        wood: { roughness: 0.6, metalness: 0.0, clearcoat: 0.4, clearcoatRoughness: 0.2 },
        metal: { roughness: 0.3, metalness: 0.7, clearcoat: 0.4, clearcoatRoughness: 0.2 },
        fabric: { roughness: 0.7, metalness: 0.0, clearcoat: 0.1, clearcoatRoughness: 0.3 },
        glass: { roughness: 0.1, metalness: 0.8, clearcoat: 0.3, clearcoatRoughness: 0.2 }
      },
      modern: {
        wood: { roughness: 0.5, metalness: 0.1, clearcoat: 0.3, clearcoatRoughness: 0.2 },
        metal: { roughness: 0.2, metalness: 0.8, clearcoat: 0.4, clearcoatRoughness: 0.1 },
        fabric: { roughness: 0.6, metalness: 0.0, clearcoat: 0.2, clearcoatRoughness: 0.2 },
        glass: { roughness: 0.1, metalness: 0.9, clearcoat: 0.4, clearcoatRoughness: 0.1 }
      },
      rustic: {
        wood: { roughness: 0.9, metalness: 0.0, clearcoat: 0.1, clearcoatRoughness: 0.4 },
        metal: { roughness: 0.8, metalness: 0.6, clearcoat: 0.1, clearcoatRoughness: 0.3 },
        fabric: { roughness: 0.9, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
        glass: { roughness: 0.3, metalness: 0.7, clearcoat: 0.2, clearcoatRoughness: 0.3 }
      }
    };

    const styleProps = styleProperties[style]?.[materialType] || {
      roughness: materialType === 'metal' ? 0.2 : materialType === 'glass' ? 0.1 : 0.8,
      metalness: materialType === 'metal' ? 0.8 : materialType === 'glass' ? 0.9 : 0.0,
      clearcoat: materialType === 'wood' ? 0.3 : materialType === 'metal' ? 0.5 : 0.0,
      clearcoatRoughness: materialType === 'wood' ? 0.4 : materialType === 'metal' ? 0.2 : 0.0
    };
    
    console.log('Creating material:', { 
      colorType, 
      materialType, 
      shade, 
      color,
      hasTexture: !!texture,
      textureType: texture?.type,
      style,
      styleProps
    });
    
    const material = (
      <meshStandardMaterial
        color={color}
        roughness={styleProps.roughness}
        metalness={styleProps.metalness}
        transparent={materialType === 'glass'}
        opacity={materialType === 'glass' ? 0.6 : 1.0}
        map={texture}
        normalScale={materialType === 'wood' ? [0.5, 0.5] : [0.3, 0.3]}
        envMapIntensity={materialType === 'metal' ? 1.0 : materialType === 'glass' ? 0.8 : 0.5}
        clearcoat={styleProps.clearcoat}
        clearcoatRoughness={styleProps.clearcoatRoughness}
      />
    );

    console.log('Created material:', material);
    return material;
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Helper function to scale dimensions
  const scaleDimension = (baseDimension, scaleFactor) => {
    // Make the scaling more pronounced
    return baseDimension * (scaleFactor * 2);
  };

  const renderFurniture = () => {
    switch (type) {
      case 'chair':
        return renderChair();
      case 'table':
        return renderTable();
      case 'sofa':
        return renderSofa();
      case 'bookshelf':
        return renderBookshelf();
      case 'bed':
        return renderBed();
      case 'cabinet':
        return renderCabinet();
      case 'desk':
        return renderDesk();
      case 'wardrobe':
        return renderWardrobe();
      case 'coffee_table':
        return renderCoffeeTable();
      case 'tv_stand':
        return renderTVStand();
      default:
        return (
          <Box 
            args={[width * 2, length * 2, depth * 2]} 
            ref={meshRef}
          >
            {createMaterial(woodColor, 'wood')}
          </Box>
        );
    }
  };

  const renderChair = () => {
    const chairWidth = scaleDimension(0.5, width);
    const chairLength = scaleDimension(0.5, length);
    const chairDepth = scaleDimension(0.5, depth);

    switch (selectedChairType) {
      case 'office':
        return (
          <group ref={meshRef}>
            {/* Office Chair Base - More detailed structure */}
            <group position={[0, -0.2, 0]}>
              {/* Star Base */}
              {[...Array(5)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 5;
                return (
                  <group key={i} position={[
                    Math.cos(angle) * chairWidth * 0.3,
                    0,
                    Math.sin(angle) * chairDepth * 0.3
                  ]}>
                    {/* Base Arm */}
                    <Box 
                      args={[chairWidth * 0.1, chairLength * 0.1, chairDepth * 0.4]} 
                      position={[0, 0, chairDepth * 0.2]}
                      rotation={[0, angle, 0]}
                    >
                      {createMaterial(metalColor, 'metal')}
                    </Box>
                    
                    {/* Caster Wheel */}
                    <Cylinder 
                      args={[chairWidth * 0.03, chairWidth * 0.03, chairLength * 0.1, 8]} 
                      position={[0, -chairLength * 0.1, chairDepth * 0.4]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      {createMaterial(metalColor, 'metal')}
                    </Cylinder>
                  </group>
                );
              })}

              {/* Center Column */}
              <Cylinder 
                args={[chairWidth * 0.08, chairWidth * 0.08, chairLength * 0.4, 8]} 
                position={[0, chairLength * 0.2, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Cylinder>
            </group>

            {/* Office Chair Seat - More ergonomic design */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Base */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.1, chairDepth * 0.9]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Seat Cushion */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.15, chairDepth * 0.85]} 
                position={[0, chairLength * 0.05, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Seat Trim */}
              <Box 
                args={[chairWidth * 0.95, chairLength * 0.12, chairDepth * 0.95]} 
                position={[0, chairLength * 0.01, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>

            {/* Office Chair Backrest - More ergonomic design */}
            <group position={[0, 0.3, -chairDepth * 0.3]}>
              {/* Backrest Frame */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.8, chairDepth * 0.2]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Backrest Cushion */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.75, chairDepth * 0.15]} 
                position={[0, 0, chairDepth * 0.05]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Backrest Trim */}
              <Box 
                args={[chairWidth * 0.95, chairLength * 0.82, chairDepth * 0.22]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>

            {/* Office Chair Armrests - More comfortable design */}
            <group position={[0, 0.2, 0]}>
              {/* Left Armrest */}
              <group position={[chairWidth * 0.45, 0, 0]}>
                {/* Armrest Base */}
                <Box 
                  args={[chairWidth * 0.1, chairLength * 0.6, chairDepth * 0.8]} 
                  position={[0, 0, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Box>
                
                {/* Armrest Pad */}
                <Box 
                  args={[chairWidth * 0.08, chairLength * 0.5, chairDepth * 0.7]} 
                  position={[0, chairLength * 0.05, 0]}
                >
                  {createMaterial(fabricColor, 'fabric')}
                </Box>
              </group>
              
              {/* Right Armrest */}
              <group position={[-chairWidth * 0.45, 0, 0]}>
                {/* Armrest Base */}
                <Box 
                  args={[chairWidth * 0.1, chairLength * 0.6, chairDepth * 0.8]} 
                  position={[0, 0, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Box>
                
                {/* Armrest Pad */}
                <Box 
                  args={[chairWidth * 0.08, chairLength * 0.5, chairDepth * 0.7]} 
                  position={[0, chairLength * 0.05, 0]}
                >
                  {createMaterial(fabricColor, 'fabric')}
                </Box>
              </group>
            </group>
          </group>
        );

      case 'dining':
        return (
          <group ref={meshRef}>
            {/* Dining Chair Seat - More elegant design */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Frame */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.1, chairDepth * 0.9]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Seat Cushion */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.15, chairDepth * 0.85]} 
                position={[0, chairLength * 0.05, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Seat Trim */}
              <Box 
                args={[chairWidth * 0.95, chairLength * 0.12, chairDepth * 0.95]} 
                position={[0, chairLength * 0.01, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Dining Chair Backrest - More elegant design */}
            <group position={[0, 0.3, -chairDepth * 0.3]}>
              {/* Backrest Frame */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.8, chairDepth * 0.2]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Backrest Panel */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.75, chairDepth * 0.15]} 
                position={[0, 0, chairDepth * 0.05]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Backrest Trim */}
              <Box 
                args={[chairWidth * 0.95, chairLength * 0.82, chairDepth * 0.22]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Dining Chair Legs - More elegant design */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * chairWidth * 0.35,
                -0.2,
                (i < 2 ? 1 : -1) * chairDepth * 0.35
              ]}>
                {/* Main Leg */}
                <Cylinder 
                  args={[chairWidth * 0.03, chairWidth * 0.03, chairLength * 0.6, 8]} 
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
                
                {/* Leg Base */}
                <Cylinder 
                  args={[chairWidth * 0.04, chairWidth * 0.04, chairLength * 0.05, 8]} 
                  position={[0, -chairLength * 0.3, 0]}
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
                
                {/* Leg Top Detail */}
                <Cylinder 
                  args={[chairWidth * 0.035, chairWidth * 0.035, chairLength * 0.05, 8]} 
                  position={[0, chairLength * 0.3, 0]}
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
              </group>
            ))}
          </group>
        );

      default:
        return (
          <group ref={meshRef}>
            {/* Basic Chair Seat - Simple design */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Frame */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.1, chairDepth * 0.9]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Seat Cushion */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.15, chairDepth * 0.85]} 
                position={[0, chairLength * 0.05, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>

            {/* Basic Chair Backrest - Simple design */}
            <group position={[0, 0.3, -chairDepth * 0.3]}>
              {/* Backrest Frame */}
              <Box 
                args={[chairWidth * 0.9, chairLength * 0.8, chairDepth * 0.2]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Backrest Panel */}
              <Box 
                args={[chairWidth * 0.85, chairLength * 0.75, chairDepth * 0.15]} 
                position={[0, 0, chairDepth * 0.05]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>

            {/* Basic Chair Legs - Simple design */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * chairWidth * 0.35,
                -0.2,
                (i < 2 ? 1 : -1) * chairDepth * 0.35
              ]}>
                {/* Main Leg */}
                <Cylinder 
                  args={[chairWidth * 0.035, chairWidth * 0.035, chairLength * 0.6, 8]} 
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
              </group>
            ))}
          </group>
        );
    }
  };

  const renderTable = () => {
    const tableWidth = scaleDimension(1.2, width);
    const tableLength = scaleDimension(1.2, length);
    const tableDepth = scaleDimension(0.8, depth);

    switch (selectedTableType) {
      case 'dining':
        return (
          <group ref={meshRef}>
            {/* Dining Table Top - More elegant design */}
            <group position={[0, 0.4, 0]}>
              {/* Main Table Top */}
              <Box 
                args={[tableWidth, tableLength * 0.1, tableDepth]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Table Top Trim */}
              <Box 
                args={[tableWidth * 1.05, tableLength * 0.12, tableDepth * 1.05]} 
                position={[0, -0.01, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>

              {/* Table Top Edge Detail */}
              <Box 
                args={[tableWidth * 1.08, tableLength * 0.14, tableDepth * 1.08]} 
                position={[0, -0.02, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Dining Table Legs - More elegant design */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * tableWidth * 0.35,
                0,
                (i < 2 ? 1 : -1) * tableDepth * 0.35
              ]}>
                {/* Main Leg */}
                <Cylinder 
                  args={[tableWidth * 0.05, tableWidth * 0.05, tableLength * 0.8, 8]} 
                  position={[0, -0.2, 0]}
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>

                {/* Leg Base */}
                <Cylinder 
                  args={[tableWidth * 0.08, tableWidth * 0.08, tableLength * 0.05, 8]} 
                  position={[0, -0.6, 0]}
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>

                {/* Leg Top Detail */}
                <Cylinder 
                  args={[tableWidth * 0.07, tableWidth * 0.07, tableLength * 0.05, 8]} 
                  position={[0, 0.2, 0]}
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
              </group>
            ))}

            {/* Dining Table Cross Support */}
            <group position={[0, -0.2, 0]}>
              {/* Horizontal Support */}
              <Box 
                args={[tableWidth * 0.7, tableLength * 0.05, tableDepth * 0.7]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>

              {/* Decorative Trim */}
              <Box 
                args={[tableWidth * 0.75, tableLength * 0.07, tableDepth * 0.75]} 
                position={[0, -0.01, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>
          </group>
        );
      case 'coffee':
        return (
          <group ref={meshRef}>
            {/* Coffee Table Top - Modern design */}
            <group position={[0, 0.3, 0]}>
              {/* Main Table Top */}
              <Box 
                args={[tableWidth, tableLength * 0.08, tableDepth]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Table Top Trim */}
              <Box 
                args={[tableWidth * 1.05, tableLength * 0.1, tableDepth * 1.05]} 
                position={[0, -0.01, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>

              {/* Table Top Edge Detail */}
              <Box 
                args={[tableWidth * 1.08, tableLength * 0.12, tableDepth * 1.08]} 
                position={[0, -0.02, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Coffee Table Legs - Modern design */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * tableWidth * 0.35,
                0,
                (i < 2 ? 1 : -1) * tableDepth * 0.35
              ]}>
                {/* Main Leg */}
                <Cylinder 
                  args={[tableWidth * 0.04, tableWidth * 0.04, tableLength * 0.6, 8]} 
                  position={[0, -0.15, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>

                {/* Leg Base */}
                <Cylinder 
                  args={[tableWidth * 0.06, tableWidth * 0.06, tableLength * 0.04, 8]} 
                  position={[0, -0.45, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>

                {/* Leg Top Detail */}
                <Cylinder 
                  args={[tableWidth * 0.05, tableWidth * 0.05, tableLength * 0.04, 8]} 
                  position={[0, 0.15, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              </group>
            ))}

            {/* Coffee Table Cross Support */}
            <group position={[0, -0.15, 0]}>
              {/* Horizontal Support */}
              <Box 
                args={[tableWidth * 0.6, tableLength * 0.04, tableDepth * 0.6]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>

              {/* Decorative Trim */}
              <Box 
                args={[tableWidth * 0.65, tableLength * 0.06, tableDepth * 0.65]} 
                position={[0, -0.01, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>
          </group>
        );
      case 'console':
        return (
          <group ref={meshRef}>
            {/* Console Table Top */}
            <Box 
              args={[2, 0.1, 0.6]} 
              position={[0, 0.8, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Console Table Legs */}
            <Cylinder 
              args={[0.06, 0.06, 1.6, 8]} 
              position={[0.9, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Cylinder>
            <Cylinder 
              args={[0.06, 0.06, 1.6, 8]} 
              position={[-0.9, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Cylinder>

            {/* Console Table Shelf */}
            <Box 
              args={[1.8, 0.05, 0.5]} 
              position={[0, 0.4, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
          </group>
        );
      default:
        return (
          <group ref={meshRef}>
            {/* Basic Table Top */}
            <Box 
              args={[tableWidth, tableLength * 0.1, tableDepth]} 
              position={[0, 0.4, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Basic Table Legs */}
            {[...Array(4)].map((_, i) => (
              <Cylinder 
                key={i}
                args={[tableWidth * 0.05, tableWidth * 0.05, tableLength * 0.8, 8]} 
                position={[
                  (i % 2 === 0 ? 1 : -1) * tableWidth * 0.35,
                  0,
                  (i < 2 ? 1 : -1) * tableDepth * 0.35
                ]}
              >
                {createMaterial(woodColor, 'wood')}
              </Cylinder>
            ))}
          </group>
        );
    }
  };

  const renderSofa = () => {
    const sofaWidth = scaleDimension(2, width);
    const sofaLength = scaleDimension(1, length);
    const sofaDepth = scaleDimension(0.8, depth);

    switch (selectedSofaType) {
      case 'modern':
        return (
          <group ref={meshRef}>
            {/* Modern Sofa Base */}
            <group position={[0, -0.2, 0]}>
              {/* Main Base */}
              <Box 
                args={[sofaWidth, sofaLength * 0.2, sofaDepth]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Base Trim */}
              <Box 
                args={[sofaWidth * 1.05, sofaLength * 0.22, sofaDepth * 1.05]} 
                position={[0, 0.01, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>

            {/* Modern Sofa Cushions */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.25, sofaDepth * 0.95]} 
                position={[0, 0, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Back Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.8, sofaDepth * 0.3]} 
                position={[0, 0.4, -sofaDepth * 0.3]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Armrests */}
              <Box 
                args={[sofaWidth * 0.1, sofaLength * 0.6, sofaDepth * 0.9]} 
                position={[sofaWidth * 0.45, 0.2, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              <Box 
                args={[sofaWidth * 0.1, sofaLength * 0.6, sofaDepth * 0.9]} 
                position={[-sofaWidth * 0.45, 0.2, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Decorative Pillows */}
              <Box 
                args={[sofaWidth * 0.3, sofaLength * 0.2, sofaDepth * 0.2]} 
                position={[sofaWidth * 0.2, 0.3, -sofaDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              <Box 
                args={[sofaWidth * 0.3, sofaLength * 0.2, sofaDepth * 0.2]} 
                position={[-sofaWidth * 0.2, 0.3, -sofaDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>

            {/* Modern Sofa Legs */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * sofaWidth * 0.4,
                -0.3,
                (i < 2 ? 1 : -1) * sofaDepth * 0.4
              ]}>
                <Cylinder 
                  args={[sofaWidth * 0.03, sofaWidth * 0.03, sofaLength * 0.2, 8]} 
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              </group>
            ))}
          </group>
        );

      case 'classic':
        return (
          <group ref={meshRef}>
            {/* Classic Sofa Base */}
            <group position={[0, -0.2, 0]}>
              {/* Main Base */}
              <Box 
                args={[sofaWidth, sofaLength * 0.2, sofaDepth]} 
                position={[0, 0, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Base Trim */}
              <Box 
                args={[sofaWidth * 1.05, sofaLength * 0.22, sofaDepth * 1.05]} 
                position={[0, 0.01, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Classic Sofa Cushions */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.25, sofaDepth * 0.95]} 
                position={[0, 0, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Back Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.8, sofaDepth * 0.3]} 
                position={[0, 0.4, -sofaDepth * 0.3]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Armrests */}
              <Box 
                args={[sofaWidth * 0.1, sofaLength * 0.6, sofaDepth * 0.9]} 
                position={[sofaWidth * 0.45, 0.2, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              <Box 
                args={[sofaWidth * 0.1, sofaLength * 0.6, sofaDepth * 0.9]} 
                position={[-sofaWidth * 0.45, 0.2, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Decorative Pillows */}
              <Box 
                args={[sofaWidth * 0.3, sofaLength * 0.2, sofaDepth * 0.2]} 
                position={[sofaWidth * 0.2, 0.3, -sofaDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              <Box 
                args={[sofaWidth * 0.3, sofaLength * 0.2, sofaDepth * 0.2]} 
                position={[-sofaWidth * 0.2, 0.3, -sofaDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>

            {/* Classic Sofa Legs */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * sofaWidth * 0.4,
                -0.3,
                (i < 2 ? 1 : -1) * sofaDepth * 0.4
              ]}>
                <Cylinder 
                  args={[sofaWidth * 0.04, sofaWidth * 0.04, sofaLength * 0.2, 8]} 
                >
                  {createMaterial(woodColor, 'wood')}
                </Cylinder>
              </group>
            ))}
          </group>
        );

      default:
        return (
          <group ref={meshRef}>
            {/* Basic Sofa Base */}
            <Box 
              args={[sofaWidth, sofaLength * 0.2, sofaDepth]} 
              position={[0, -0.2, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>

            {/* Basic Sofa Cushions */}
            <group position={[0, 0.1, 0]}>
              {/* Seat Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.25, sofaDepth * 0.95]} 
                position={[0, 0, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Back Cushion */}
              <Box 
                args={[sofaWidth * 0.95, sofaLength * 0.8, sofaDepth * 0.3]} 
                position={[0, 0.4, -sofaDepth * 0.3]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>

            {/* Basic Sofa Legs */}
            {[...Array(4)].map((_, i) => (
              <Cylinder 
                key={i}
                args={[sofaWidth * 0.04, sofaWidth * 0.04, sofaLength * 0.2, 8]} 
                position={[
                  (i % 2 === 0 ? 1 : -1) * sofaWidth * 0.4,
                  -0.3,
                  (i < 2 ? 1 : -1) * sofaDepth * 0.4
                ]}
              >
                {createMaterial(woodColor, 'wood')}
              </Cylinder>
            ))}
          </group>
        );
    }
  };

  const renderBookshelf = () => {
    const shelfWidth = scaleDimension(1.2, width);
    const shelfLength = scaleDimension(1.8, length);
    const shelfDepth = scaleDimension(0.4, depth);

    // Helper function to create a random book
    const createBook = (position, width, height, depth, color) => (
      <Box 
        args={[width, height, depth]} 
        position={position}
      >
        {createMaterial(color, 'fabric')}
      </Box>
    );

    // Generate random books for each shelf
    const generateBooks = (shelfY) => {
      const books = [];
      let currentX = -shelfWidth * 0.4;
      const maxBooks = Math.floor(Math.random() * 5) + 3; // Random number of books per shelf

      for (let i = 0; i < maxBooks; i++) {
        const bookWidth = Math.random() * 0.1 + 0.05;
        const bookHeight = Math.random() * 0.2 + 0.15;
        const bookDepth = shelfDepth * 0.8;
        
        if (currentX + bookWidth > shelfWidth * 0.4) break;
        
        books.push(
          createBook(
            [currentX + bookWidth/2, shelfY, 0],
            bookWidth,
            bookHeight,
            bookDepth,
            Math.random() > 0.5 ? 'wood' : 'fabric'
          )
        );
        currentX += bookWidth + 0.02; // Small gap between books
      }
      return books;
    };

    return (
      <group ref={meshRef}>
        {/* Bookshelf Frame - Top */}
        <Box args={[shelfWidth, shelfLength * 0.05, shelfDepth]} position={[0, shelfLength * 0.5, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Bookshelf Frame - Bottom */}
        <Box args={[shelfWidth, shelfLength * 0.05, shelfDepth]} position={[0, -shelfLength * 0.5, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Bookshelf Frame - Left Side */}
        <Box args={[shelfWidth * 0.05, shelfLength, shelfDepth]} position={[-shelfWidth * 0.475, 0, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Bookshelf Frame - Right Side */}
        <Box args={[shelfWidth * 0.05, shelfLength, shelfDepth]} position={[shelfWidth * 0.475, 0, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Bookshelf Frame - Back */}
        <Box args={[shelfWidth * 0.9, shelfLength * 0.9, shelfDepth * 0.05]} position={[0, 0, -shelfDepth * 0.475]}>
          {createMaterial(woodColor, 'wood')}
        </Box>

        {/* Adjustable Shelves */}
        {[...Array(4)].map((_, i) => {
          const shelfY = -shelfLength * 0.4 + i * shelfLength * 0.25;
          return (
            <group key={i}>
              {/* Shelf */}
              <Box 
                args={[shelfWidth * 0.9, shelfLength * 0.03, shelfDepth * 0.9]} 
                position={[0, shelfY, 0]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Shelf Support Pins */}
              {[...Array(4)].map((_, j) => (
                <Cylinder
                  key={j}
                  args={[shelfWidth * 0.01, shelfWidth * 0.01, shelfDepth * 0.1, 8]}
                  position={[
                    (j % 2 === 0 ? 1 : -1) * shelfWidth * 0.4,
                    shelfY,
                    (j < 2 ? 1 : -1) * shelfDepth * 0.4
                  ]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              ))}

              {/* Books on this shelf */}
              {generateBooks(shelfY + shelfLength * 0.02)}
            </group>
          );
        })}

        {/* Decorative Top Molding */}
        <Box 
          args={[shelfWidth * 1.1, shelfLength * 0.05, shelfDepth * 1.1]} 
          position={[0, shelfLength * 0.55, 0]}
        >
          {createMaterial(woodColor, 'wood')}
        </Box>

        {/* Decorative Bottom Base */}
        <Box 
          args={[shelfWidth * 1.1, shelfLength * 0.05, shelfDepth * 1.1]} 
          position={[0, -shelfLength * 0.55, 0]}
        >
          {createMaterial(woodColor, 'wood')}
        </Box>
      </group>
    );
  };

  const renderBed = () => {
    const bedWidth = scaleDimension(1.6, width);
    const bedLength = scaleDimension(2, length);
    const bedDepth = scaleDimension(0.5, depth);

    switch (selectedBedType) {
      case 'modern':
        return (
          <group ref={meshRef}>
            {/* Modern Bed Frame - More detailed structure */}
            <group position={[0, -0.15, 0]}>
              {/* Main Frame */}
              <Box 
                args={[bedWidth, bedLength * 0.25, bedDepth]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Frame Trim */}
              <Box 
                args={[bedWidth * 1.05, bedLength * 0.28, bedDepth * 1.05]} 
                position={[0, 0.03, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>

              {/* Frame Edge Detail */}
              <Box 
                args={[bedWidth * 1.08, bedLength * 0.3, bedDepth * 1.08]} 
                position={[0, 0.06, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>
            
            {/* Modern Bed Mattress - More realistic layers */}
            <group position={[0, 0.15, 0]}>
              {/* Base Layer */}
              <Box 
                args={[bedWidth * 0.95, bedLength * 0.35, bedDepth * 0.95]} 
                position={[0, 0, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Middle Layer */}
              <Box 
                args={[bedWidth * 0.92, bedLength * 0.3, bedDepth * 0.92]} 
                position={[0, 0.08, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Top Layer */}
              <Box 
                args={[bedWidth * 0.9, bedLength * 0.25, bedDepth * 0.9]} 
                position={[0, 0.16, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              
              {/* Pillow Layer */}
              <Box 
                args={[bedWidth * 0.98, bedLength * 0.08, bedDepth * 0.98]} 
                position={[0, 0.28, 0]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Decorative Pillows */}
              <Box 
                args={[bedWidth * 0.3, bedLength * 0.15, bedDepth * 0.2]} 
                position={[bedWidth * 0.2, 0.3, -bedDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
              <Box 
                args={[bedWidth * 0.3, bedLength * 0.15, bedDepth * 0.2]} 
                position={[-bedWidth * 0.2, 0.3, -bedDepth * 0.2]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>
            </group>
            
            {/* Modern Bed Headboard - More elegant design */}
            <group position={[0, 0.45, -bedDepth * 0.4]}>
              {/* Headboard Frame */}
              <Box 
                args={[bedWidth * 1.05, bedLength * 0.85, bedDepth * 0.25]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Headboard Panel */}
              <Box 
                args={[bedWidth * 1.0, bedLength * 0.75, bedDepth * 0.2]} 
                position={[0, 0, bedDepth * 0.08]}
              >
                {createMaterial(fabricColor, 'fabric')}
              </Box>

              {/* Headboard Trim */}
              <Box 
                args={[bedWidth * 1.08, bedLength * 0.87, bedDepth * 0.27]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
            </group>

            {/* Modern Bed Legs - More detailed design */}
            {[...Array(4)].map((_, i) => (
              <group key={i} position={[
                (i % 2 === 0 ? 1 : -1) * bedWidth * 0.42,
                -0.25,
                (i < 2 ? 1 : -1) * bedDepth * 0.42
              ]}>
                {/* Main Leg */}
                <Cylinder 
                  args={[bedWidth * 0.035, bedWidth * 0.025, bedLength * 0.25, 8]} 
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
                
                {/* Leg Base */}
                <Cylinder 
                  args={[bedWidth * 0.045, bedWidth * 0.045, bedLength * 0.05, 8]} 
                  position={[0, -bedLength * 0.15, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
                
                {/* Leg Top Detail */}
                <Cylinder 
                  args={[bedWidth * 0.04, bedWidth * 0.04, bedLength * 0.05, 8]} 
                  position={[0, bedLength * 0.15, 0]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              </group>
            ))}

            {/* Modern Bed Side Tables - More detailed design */}
            <group position={[bedWidth * 0.6, 0, 0]}>
              {/* Table Top */}
              <Box 
                args={[bedWidth * 0.22, bedLength * 0.45, bedDepth * 0.22]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Table Drawer */}
              <Box 
                args={[bedWidth * 0.2, bedLength * 0.1, bedDepth * 0.2]} 
                position={[0, -bedLength * 0.15, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Table Legs */}
              {[...Array(4)].map((_, i) => (
                <Cylinder 
                  key={i}
                  args={[bedWidth * 0.02, bedWidth * 0.02, bedLength * 0.3, 8]} 
                  position={[
                    (i % 2 === 0 ? 1 : -1) * bedWidth * 0.08,
                    -bedLength * 0.3,
                    (i < 2 ? 1 : -1) * bedDepth * 0.08
                  ]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              ))}
            </group>
            <group position={[-bedWidth * 0.6, 0, 0]}>
              {/* Table Top */}
              <Box 
                args={[bedWidth * 0.22, bedLength * 0.45, bedDepth * 0.22]} 
                position={[0, 0, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Table Drawer */}
              <Box 
                args={[bedWidth * 0.2, bedLength * 0.1, bedDepth * 0.2]} 
                position={[0, -bedLength * 0.15, 0]}
              >
                {createMaterial(metalColor, 'metal')}
              </Box>
              
              {/* Table Legs */}
              {[...Array(4)].map((_, i) => (
                <Cylinder 
                  key={i}
                  args={[bedWidth * 0.02, bedWidth * 0.02, bedLength * 0.3, 8]} 
                  position={[
                    (i % 2 === 0 ? 1 : -1) * bedWidth * 0.08,
                    -bedLength * 0.3,
                    (i < 2 ? 1 : -1) * bedDepth * 0.08
                  ]}
                >
                  {createMaterial(metalColor, 'metal')}
                </Cylinder>
              ))}
            </group>
          </group>
        );
    }
  };

  const renderCabinet = () => {
    const cabinetWidth = scaleDimension(1, width);
    const cabinetLength = scaleDimension(1.2, length);
    const cabinetDepth = scaleDimension(0.6, depth);

    switch (selectedCabinetType) {
      case 'modern':
        return (
          <group ref={meshRef}>
            {/* Modern Cabinet Frame */}
            <Box 
              args={[cabinetWidth, cabinetLength, cabinetDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(metalColor, 'metal')}
            </Box>
            
            {/* Modern Cabinet Doors */}
            <Box 
              args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} 
              position={[cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}
            >
              {createMaterial(glassColor, 'glass')}
            </Box>
            <Box 
              args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} 
              position={[-cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}
            >
              {createMaterial(glassColor, 'glass')}
            </Box>
          </group>
        );
      case 'classic':
        return (
          <group ref={meshRef}>
            {/* Classic Cabinet Frame */}
            <Box 
              args={[cabinetWidth, cabinetLength, cabinetDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Classic Cabinet Doors */}
            <Box 
              args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} 
              position={[cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            <Box 
              args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} 
              position={[-cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
          </group>
        );
      default:
        return (
          <group ref={meshRef}>
            {/* Basic Cabinet Frame */}
            <Box args={[cabinetWidth, cabinetLength, cabinetDepth]} position={[0, 0, 0]}>
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Basic Cabinet Doors */}
            <Box args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} position={[cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}>
              {createMaterial(woodColor, 'wood')}
            </Box>
            <Box args={[cabinetWidth * 0.45, cabinetLength * 0.9, cabinetDepth * 0.1]} position={[-cabinetWidth * 0.25, 0, cabinetDepth * 0.45]}>
              {createMaterial(woodColor, 'wood')}
            </Box>
          </group>
        );
    }
  };

  const renderDesk = () => {
    const deskWidth = scaleDimension(1.2, width);
    const deskLength = scaleDimension(0.8, length);
    const deskDepth = scaleDimension(0.6, depth);

    return (
      <group ref={meshRef}>
        {/* Desk Top */}
        <Box args={[deskWidth, deskLength * 0.1, deskDepth]} position={[0, 0.4, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Desk Legs */}
        {[...Array(4)].map((_, i) => (
          <Cylinder 
            key={i}
            args={[deskWidth * 0.05, deskWidth * 0.05, deskLength * 0.8, 8]} 
            position={[
              (i % 2 === 0 ? 1 : -1) * deskWidth * 0.4,
              0,
              (i < 2 ? 1 : -1) * deskDepth * 0.4
            ]}
          >
            {createMaterial(metalColor, 'metal')}
          </Cylinder>
        ))}
      </group>
    );
  };

  const renderWardrobe = () => {
    const wardrobeWidth = scaleDimension(1.2, width);
    const wardrobeLength = scaleDimension(1.8, length);
    const wardrobeDepth = scaleDimension(0.6, depth);

    // Helper function to create hanging rods
    const createHangingRod = (position) => (
      <Cylinder
        args={[wardrobeWidth * 0.01, wardrobeWidth * 0.01, wardrobeWidth * 0.8, 8]}
        position={position}
        rotation={[0, Math.PI / 2, 0]}
      >
        {createMaterial(metalColor, 'metal')}
      </Cylinder>
    );

    // Helper function to create shelves
    const createShelf = (position, size) => (
      <Box
        args={[size[0], wardrobeLength * 0.02, size[1]]}
        position={position}
      >
        {createMaterial(woodColor, 'wood')}
      </Box>
    );

    // Helper function to create drawers
    const createDrawer = (position, size) => (
      <group position={position}>
        <Box args={[size[0], size[1], size[2]]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        <Box 
          args={[size[0] * 0.9, size[1] * 0.1, size[2] * 0.1]} 
          position={[0, size[1] * 0.45, size[2] * 0.45]}
        >
          {createMaterial(metalColor, 'metal')}
        </Box>
      </group>
    );

    switch (selectedCabinetType) {
      case 'modern':
        return (
          <group ref={meshRef}>
            {/* Modern Wardrobe Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(metalColor, 'metal')}
            </Box>
            
            {/* Modern Wardrobe Doors */}
            <group>
              {/* Left Door */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
                position={[wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
              >
                {createMaterial(glassColor, 'glass')}
              </Box>
              {/* Right Door */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
                position={[-wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
              >
                {createMaterial(glassColor, 'glass')}
              </Box>
            </group>

            {/* Modern Wardrobe Interior */}
            <group>
              {/* Hanging Rods */}
              {createHangingRod([0, wardrobeLength * 0.3, 0])}
              {createHangingRod([0, -wardrobeLength * 0.3, 0])}
              
              {/* Shelves */}
              {createShelf([0, wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
            </group>
          </group>
        );

      case 'classic':
        return (
          <group ref={meshRef}>
            {/* Classic Wardrobe Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Classic Wardrobe Doors */}
            <group>
              {/* Left Door */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
                position={[wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              {/* Right Door */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
                position={[-wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Classic Wardrobe Interior */}
            <group>
              {/* Hanging Rods */}
              {createHangingRod([0, wardrobeLength * 0.3, 0])}
              {createHangingRod([0, -wardrobeLength * 0.3, 0])}
              
              {/* Shelves */}
              {createShelf([0, wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
            </group>
          </group>
        );

      case 'kitchen':
        return (
          <group ref={meshRef}>
            {/* Kitchen Cabinet Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Kitchen Cabinet Doors */}
            <group>
              {/* Upper Cabinet Doors */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[wardrobeWidth * 0.25, wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[-wardrobeWidth * 0.25, wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Lower Cabinet Doors */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[wardrobeWidth * 0.25, -wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[-wardrobeWidth * 0.25, -wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Kitchen Cabinet Interior */}
            <group>
              {/* Shelves */}
              {createShelf([0, wardrobeLength * 0.1, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.1, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              
              {/* Drawers */}
              {createDrawer(
                [0, wardrobeLength * 0.3, wardrobeDepth * 0.45],
                [wardrobeWidth * 0.8, wardrobeLength * 0.15, wardrobeDepth * 0.4]
              )}
              {createDrawer(
                [0, -wardrobeLength * 0.3, wardrobeDepth * 0.45],
                [wardrobeWidth * 0.8, wardrobeLength * 0.15, wardrobeDepth * 0.4]
              )}
            </group>
          </group>
        );

      case 'bathroom':
        return (
          <group ref={meshRef}>
            {/* Bathroom Cabinet Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Bathroom Cabinet Doors */}
            <group>
              {/* Upper Cabinet Door */}
              <Box 
                args={[wardrobeWidth * 0.9, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[0, wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              
              {/* Lower Cabinet Doors */}
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[wardrobeWidth * 0.25, -wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
              <Box 
                args={[wardrobeWidth * 0.45, wardrobeLength * 0.4, wardrobeDepth * 0.1]} 
                position={[-wardrobeWidth * 0.25, -wardrobeLength * 0.2, wardrobeDepth * 0.45]}
              >
                {createMaterial(woodColor, 'wood')}
              </Box>
            </group>

            {/* Bathroom Cabinet Interior */}
            <group>
              {/* Shelves */}
              {createShelf([0, wardrobeLength * 0.1, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.1, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              
              {/* Drawers */}
              {createDrawer(
                [0, -wardrobeLength * 0.3, wardrobeDepth * 0.45],
                [wardrobeWidth * 0.8, wardrobeLength * 0.15, wardrobeDepth * 0.4]
              )}
            </group>
          </group>
        );

      case 'walk-in':
        return (
          <group ref={meshRef}>
            {/* Walk-in Closet Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Walk-in Closet Interior */}
            <group>
              {/* Hanging Rods */}
              {createHangingRod([0, wardrobeLength * 0.3, 0])}
              {createHangingRod([0, -wardrobeLength * 0.3, 0])}
              
              {/* Shelves */}
              {createShelf([0, wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.2, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              {createShelf([0, -wardrobeLength * 0.4, 0], [wardrobeWidth * 0.8, wardrobeDepth * 0.8])}
              
              {/* Shoe Racks */}
              <group position={[0, 0, wardrobeDepth * 0.3]}>
                {[...Array(4)].map((_, i) => (
                  <Box
                    key={i}
                    args={[wardrobeWidth * 0.8, wardrobeLength * 0.05, wardrobeDepth * 0.2]}
                    position={[0, -wardrobeLength * 0.3 + i * wardrobeLength * 0.2, 0]}
                  >
                    {createMaterial(woodColor, 'wood')}
                  </Box>
                ))}
              </group>
              
              {/* Drawers */}
              {createDrawer(
                [0, wardrobeLength * 0.3, wardrobeDepth * 0.45],
                [wardrobeWidth * 0.8, wardrobeLength * 0.15, wardrobeDepth * 0.4]
              )}
              {createDrawer(
                [0, -wardrobeLength * 0.3, wardrobeDepth * 0.45],
                [wardrobeWidth * 0.8, wardrobeLength * 0.15, wardrobeDepth * 0.4]
              )}
            </group>
          </group>
        );

      default:
        return (
          <group ref={meshRef}>
            {/* Basic Wardrobe Frame */}
            <Box 
              args={[wardrobeWidth, wardrobeLength, wardrobeDepth]} 
              position={[0, 0, 0]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            
            {/* Basic Wardrobe Doors */}
            <Box 
              args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
              position={[wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
            <Box 
              args={[wardrobeWidth * 0.45, wardrobeLength * 0.9, wardrobeDepth * 0.1]} 
              position={[-wardrobeWidth * 0.25, 0, wardrobeDepth * 0.45]}
            >
              {createMaterial(woodColor, 'wood')}
            </Box>
          </group>
        );
    }
  };

  const renderCoffeeTable = () => {
    const tableWidth = scaleDimension(1, width);
    const tableLength = scaleDimension(0.6, length);
    const tableDepth = scaleDimension(0.5, depth);

    return (
      <group ref={meshRef}>
        {/* Coffee Table Top */}
        <Box args={[tableWidth, tableLength * 0.1, tableDepth]} position={[0, 0.3, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* Coffee Table Base */}
        <Box args={[tableWidth * 0.8, tableLength * 0.6, tableDepth * 0.8]} position={[0, -0.1, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
      </group>
    );
  };

  const renderTVStand = () => {
    const standWidth = scaleDimension(1.4, width);
    const standLength = scaleDimension(0.5, length);
    const standDepth = scaleDimension(0.4, depth);

    return (
      <group ref={meshRef}>
        {/* TV Stand Top */}
        <Box args={[standWidth, standLength * 0.1, standDepth]} position={[0, 0.4, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
        
        {/* TV Stand Base */}
        <Box args={[standWidth * 0.9, standLength * 0.8, standDepth * 0.9]} position={[0, 0, 0]}>
          {createMaterial(woodColor, 'wood')}
        </Box>
      </group>
    );
  };

  return renderFurniture();
}

export default SimpleModel; 