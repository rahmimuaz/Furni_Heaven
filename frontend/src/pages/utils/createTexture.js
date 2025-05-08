import * as THREE from 'three';

export function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;  // Increased resolution
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Create base wood color
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add wood grain
  for (let i = 0; i < 100; i++) {  // More grain lines
    const x = Math.random() * canvas.width;
    const width = Math.random() * 30 + 10;  // Varied grain width
    const height = canvas.height;
    
    // Create gradient for each grain line
    const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
    gradient.addColorStop(0, 'rgba(139, 69, 19, 0.8)');
    gradient.addColorStop(0.5, 'rgba(160, 82, 45, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0.8)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, width, height);
  }

  // Add wood knots
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 50 + 30;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(101, 67, 33, 0.9)');
    gradient.addColorStop(1, 'rgba(139, 69, 19, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);  // Repeat the texture
  texture.anisotropy = 16;  // Improve texture quality
  return texture;
}

export function createFabricTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Create base fabric color
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create weave pattern
  for (let i = 0; i < canvas.width; i += 8) {
    for (let j = 0; j < canvas.height; j += 8) {
      // Vertical threads
      ctx.fillStyle = `rgba(200, 200, 200, ${Math.random() * 0.4})`;
      ctx.fillRect(i, j, 4, 8);
      
      // Horizontal threads
      ctx.fillStyle = `rgba(180, 180, 180, ${Math.random() * 0.4})`;
      ctx.fillRect(i, j, 8, 4);
    }
  }

  // Add some texture variation
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    
    ctx.fillStyle = `rgba(150, 150, 150, ${Math.random() * 0.2})`;
    ctx.fillRect(x, y, size, size);
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.anisotropy = 16;
  return texture;
}

export function createMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Create base metal color
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create brushed metal effect
  for (let i = 0; i < canvas.height; i += 2) {
    const gradient = ctx.createLinearGradient(0, i, canvas.width, i);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.random() * 0.4})`);
    gradient.addColorStop(0.5, `rgba(200, 200, 200, ${Math.random() * 0.2})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${Math.random() * 0.4})`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // Add some scratches and imperfections
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = Math.random() * 100 + 50;
    const angle = Math.random() * Math.PI * 2;
    
    ctx.strokeStyle = `rgba(100, 100, 100, ${Math.random() * 0.3})`;
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = 16;
  return texture;
}

export function createGlassTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Create base glass color
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add subtle noise
  for (let i = 0; i < canvas.width; i += 2) {
    for (let j = 0; j < canvas.height; j += 2) {
      const alpha = Math.random() * 0.1;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(i, j, 2, 2);
    }
  }

  // Add highlights
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 100 + 50;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.anisotropy = 16;
  return texture;
} 