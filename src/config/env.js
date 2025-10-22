// Primero carga dotenv
require('dotenv').config()

// Valida variables críticas
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'PORT']

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Falta la variable de entorno: ${varName}`)
  }
})

// Exporta todo organizado
module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}