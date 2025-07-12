# WiFiHeatmap

A simple Node.js application for creating a WiFi signal heatmap. Clicking on the map records the current RSSI (WiFi signal strength) using the macOS `airport` utility and updates the heatmap.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open <http://localhost:3000> in your browser and click on the map to collect data.

The collected points are stored in `data.json`.

> **Note:** The `airport` command is only available on macOS. On other systems, measurement will fail.
