// app.js
require('dotenv').config();
const express = require('express');
const { getTenantConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Example: Trigger connection for a specific tenant
const tenantId = 'fnb'; // Replace with actual tenant identifier logic
try {
  const conn = getTenantConnection(tenantId);
  conn.once('open', () => {
    console.log(`✅ Connected to MongoDB for tenant "${tenantId}"`);
  });
  conn.on('error', (err) => {
    console.error(`❌ MongoDB connection error for tenant "${tenantId}":`, err.message);
  });
} catch (err) {
  console.error('❌ Error initializing tenant DB connection:', err.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
