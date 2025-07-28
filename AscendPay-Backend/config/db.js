const mongoose = require('mongoose');
require('dotenv').config();

const connections = new Map();
const MONGO_URI_BASE = process.env.MONGO_URI_BASE;

/**
 * Get or create a Mongoose connection for the given tenant (bank).
 * @param {string} tenantId - Unique ID or name for the tenant (e.g., 'fnb', 'absa')
 * @returns {mongoose.Connection}
 */
function getTenantConnection(tenantId) {
  if (!tenantId) throw new Error('Tenant ID must be provided');

  if (connections.has(tenantId)) {
    return connections.get(tenantId);
  }

  const dbURI = `${MONGO_URI_BASE}${tenantId}`;
  const newConn = mongoose.createConnection(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log successful connection
  newConn.on('connected', () => {
    console.log(`✅ Connected to database for tenant: ${tenantId}`);
  });

  // Log connection error
  newConn.on('error', (err) => {
    console.error(`❌ Failed to connect to database for tenant: ${tenantId}`, err);
  });

  connections.set(tenantId, newConn);
  return newConn;
}

module.exports = { getTenantConnection };
