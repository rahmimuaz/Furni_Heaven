// Material color palettes for furniture
export const materialColors = {
  wood: {
    oak: {
      light: '#E6C9A8',
      medium: '#A67B5B',
      dark: '#8B4513'
    },
    walnut: {
      light: '#C19A6B',
      medium: '#8B4513',
      dark: '#654321'
    },
    mahogany: {
      light: '#CD5C5C',
      medium: '#8B0000',
      dark: '#4B0000'
    },
    pine: {
      light: '#FFE4B5',
      medium: '#DEB887',
      dark: '#CD853F'
    },
    cherry: {
      light: '#FFB6C1',
      medium: '#CD5C5C',
      dark: '#8B0000'
    }
  },
  metal: {
    chrome: {
      light: '#FFFFFF',
      medium: '#E0E0E0',
      dark: '#C0C0C0'
    },
    brass: {
      light: '#FFD700',
      medium: '#DAA520',
      dark: '#B8860B'
    },
    bronze: {
      light: '#CD7F32',
      medium: '#8B4513',
      dark: '#654321'
    },
    steel: {
      light: '#E0E0E0',
      medium: '#A9A9A9',
      dark: '#696969'
    },
    gold: {
      light: '#FFD700',
      medium: '#DAA520',
      dark: '#B8860B'
    }
  },
  fabric: {
    cotton: {
      light: '#FFFFFF',
      medium: '#F5F5F5',
      dark: '#E0E0E0'
    },
    leather: {
      light: '#8B4513',
      medium: '#654321',
      dark: '#3B2F2F'
    },
    velvet: {
      light: '#4B0082',
      medium: '#2E0854',
      dark: '#1A0033'
    },
    linen: {
      light: '#FAF0E6',
      medium: '#F5E6D3',
      dark: '#E6D5C3'
    },
    silk: {
      light: '#FFE4E1',
      medium: '#FFB6C1',
      dark: '#FF69B4'
    }
  },
  glass: {
    clear: {
      light: '#FFFFFF',
      medium: '#F0F0F0',
      dark: '#E0E0E0'
    },
    frosted: {
      light: '#F5F5F5',
      medium: '#E8E8E8',
      dark: '#DCDCDC'
    },
    tinted: {
      light: '#E6E6FA',
      medium: '#D8D8F6',
      dark: '#C8C8F0'
    },
    smoked: {
      light: '#A9A9A9',
      medium: '#808080',
      dark: '#696969'
    },
    colored: {
      light: '#FFE4E1',
      medium: '#FFB6C1',
      dark: '#FF69B4'
    }
  }
};

// Helper function to get color based on material type and shade
export const getMaterialColor = (materialType, type, shade = 'medium') => {
  console.log('Getting material color:', { materialType, type, shade });
  console.log('Available colors:', materialColors[materialType]);
  
  const color = materialColors[materialType]?.[type]?.[shade];
  if (!color) {
    console.warn(`Color not found for materialType: ${materialType}, type: ${type}, shade: ${shade}`);
    return '#808080';
  }
  console.log('Found color:', color);
  return color;
}; 