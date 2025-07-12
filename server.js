const express = require('express');
const fs = require('fs');
const { execSync } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataFile = 'data.json';

function readData() {
  try {
    const content = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
}

function writeData(points) {
  fs.writeFileSync(dataFile, JSON.stringify(points, null, 2));
}

function measureRSSI() {
  try {
    const output = execSync('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I', { encoding: 'utf8' });
    const match = output.match(/agrCtlRSSI:\s*(-?\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
  } catch (err) {
    console.error('Failed to run airport:', err.message);
  }
  return null;
}

app.post('/measure', (req, res) => {
  const { x, y } = req.body;
  if (typeof x !== 'number' || typeof y !== 'number') {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const rssi = measureRSSI();
  const point = { x, y, rssi };

  const data = readData();
  data.push(point);
  writeData(data);

  res.json(point);
});

app.get('/data', (req, res) => {
  res.json(readData());
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
