const fs = require('fs');
const path = require('path');
const https = require('https');

const models = [
  {
    name: 'chair',
    url: 'https://free3d.com/download-file-3d-model-chair-obj.html',
    filename: 'chair.glb'
  },
  {
    name: 'table',
    url: 'https://free3d.com/download-file-3d-model-table-obj.html',
    filename: 'table.glb'
  },
  {
    name: 'sofa',
    url: 'https://free3d.com/download-file-3d-model-sofa-obj.html',
    filename: 'sofa.glb'
  }
];

const modelsDir = path.join(__dirname, 'client', 'public', 'models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Download function
function downloadModel(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(modelsDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
}

// Download all models
async function downloadAllModels() {
  for (const model of models) {
    try {
      console.log(`Downloading ${model.name}...`);
      await downloadModel(model.url, model.filename);
      console.log(`Successfully downloaded ${model.name}`);
    } catch (error) {
      console.error(`Error downloading ${model.name}:`, error);
    }
  }
}

downloadAllModels(); 