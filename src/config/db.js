const env = require('./env')

module.exports = {
  // Configuración básica de conexión
  host: env.database.host,
  port: parseInt(env.database.port),
  database: env.database.name,
  user: env.database.user,
  password: env.database.password,
  
  // Pool de conexiones (cuántas conexiones simultáneas)
  pool: {
    min: 2,           // Mínimo de conexiones abiertas
    max: 10,          // Máximo de conexiones
    idleTimeoutMillis: 30000,  // Cierra conexiones inactivas después de 30s
    connectionTimeoutMillis: 2000  // Tiempo máximo para establecer conexión
  },
  
  // SSL solo en producción
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
}