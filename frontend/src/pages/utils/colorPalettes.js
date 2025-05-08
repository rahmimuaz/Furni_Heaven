export const colorPalettes = {
  // Modern & Minimalist
  modern: {
    primary: '#2C3E50',    // Deep Blue-Gray
    secondary: '#ECF0F1',  // Light Gray
    accent: '#E74C3C',     // Coral Red
    wood: '#8B7355',       // Warm Brown
    metal: '#95A5A6',      // Cool Gray
    fabric: '#F5F6FA',     // Off-White
    glass: '#FFFFFF',      // Pure White
  },

  // Scandinavian
  scandinavian: {
    primary: '#F7F9FC',    // Ice White
    secondary: '#E8E8E8',  // Light Gray
    accent: '#6C5B7B',     // Muted Purple
    wood: '#A67C52',       // Light Oak
    metal: '#B8B8B8',      // Silver
    fabric: '#F0F0F0',     // Cream
    glass: '#F5F5F5',      // Frosted White
  },

  // Industrial
  industrial: {
    primary: '#2C3E50',    // Dark Blue
    secondary: '#34495E',  // Slate
    accent: '#E67E22',     // Orange
    wood: '#5D4037',       // Dark Wood
    metal: '#7F8C8D',      // Steel
    fabric: '#BDC3C7',     // Concrete
    glass: '#ECF0F1',      // Light Gray
  },

  // Bohemian
  bohemian: {
    primary: '#8E44AD',    // Purple
    secondary: '#D35400',  // Burnt Orange
    accent: '#27AE60',     // Emerald
    wood: '#A040A0',       // Plum
    metal: '#C0392B',      // Rust
    fabric: '#F1C40F',     // Gold
    glass: '#3498DB',      // Blue
  },

  // Coastal
  coastal: {
    primary: '#3498DB',    // Ocean Blue
    secondary: '#AED6F1',  // Sky Blue
    accent: '#F1C40F',     // Sand
    wood: '#D6EAF8',       // Driftwood
    metal: '#85C1E9',      // Silver
    fabric: '#EBF5FB',     // Seafoam
    glass: '#D6EAF8',      // Crystal
  },

  // Rustic
  rustic: {
    primary: '#8B4513',    // Saddle Brown
    secondary: '#A0522D',  // Sienna
    accent: '#D2691E',     // Chocolate
    wood: '#6B4423',       // Dark Oak
    metal: '#8B7355',      // Bronze
    fabric: '#DEB887',     // Burlywood
    glass: '#F5DEB3',      // Wheat
  },

  // Luxury
  luxury: {
    primary: '#2C3E50',    // Deep Blue
    secondary: '#C0392B',  // Burgundy
    accent: '#F1C40F',     // Gold
    wood: '#4A235A',       // Deep Purple
    metal: '#7F8C8D',      // Platinum
    fabric: '#1A237E',     // Royal Blue
    glass: '#E8EAF6',      // Crystal
  },

  // Contemporary
  contemporary: {
    primary: '#34495E',    // Dark Blue
    secondary: '#E74C3C',  // Red
    accent: '#2ECC71',     // Green
    wood: '#7F8C8D',       // Gray
    metal: '#95A5A6',      // Silver
    fabric: '#ECF0F1',     // White
    glass: '#BDC3C7',      // Light Gray
  },

  // Vintage
  vintage: {
    primary: '#8E44AD',    // Purple
    secondary: '#D35400',  // Orange
    accent: '#F1C40F',     // Yellow
    wood: '#A040A0',       // Plum
    metal: '#C0392B',      // Rust
    fabric: '#F39C12',     // Amber
    glass: '#D35400',      // Copper
  },

  // Zen
  zen: {
    primary: '#2C3E50',    // Deep Blue
    secondary: '#7F8C8D',  // Gray
    accent: '#27AE60',     // Green
    wood: '#34495E',       // Slate
    metal: '#95A5A6',      // Silver
    fabric: '#ECF0F1',     // White
    glass: '#BDC3C7',      // Light Gray
  }
};

// Helper function to get a random color from a palette
export function getRandomColorFromPalette(paletteName = 'modern') {
  const palette = colorPalettes[paletteName] || colorPalettes.modern;
  const colors = Object.values(palette);
  return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to get a specific color from a palette
export function getColorFromPalette(paletteName = 'modern', colorType = 'primary') {
  const palette = colorPalettes[paletteName] || colorPalettes.modern;
  return palette[colorType] || palette.primary;
} 