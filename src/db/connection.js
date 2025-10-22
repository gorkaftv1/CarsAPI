const { Pool } = require('pg')
const database = require('../config/db')

const pool = new Pool({
  host: database.host,
  port: database.port,
  database: database.database,
  user: database.user,
  password: database.password,
  max: database.pool.max,
  min: database.pool.min,
  idleTimeoutMillis: database.pool.idleTimeoutMillis,
  connectionTimeoutMillis: database.pool.connectionTimeoutMillis
})

// Test de conexión al iniciar
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL')
})

pool.on('error', (err) => {
  console.error('❌ Error en PostgreSQL:', err.message)
})

module.exports = pool