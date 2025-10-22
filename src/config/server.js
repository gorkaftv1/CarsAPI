const env = require('./env')

module.exports = {
  // Configuración básica
  port: env.port,
  host: '0.0.0.0',  // Necesario para Docker
  
  // CORS - Permite acceso desde cualquier origen
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With'],
    credentials: false
  },
  
  // Rate Limiting - Protege contra abuso
  rateLimit: {
    windowMs: 15 * 60 * 1000,  // 15 minutos
    max: env.nodeEnv === 'production' ? 100 : 1000,
    message: {
      error: 'Demasiadas peticiones. Intenta de nuevo más tarde.',
      retryAfter: 15
    },
    standardHeaders: true,
    legacyHeaders: false
  },
  
  // Body Parser - Límites de tamaño
  bodyParser: {
    json: { 
      limit: '5mb',
      strict: true
    },
    urlencoded: { 
      limit: '5mb',
      extended: true
    }
  },
  
  // Logging
  logging: {
    level: env.nodeEnv === 'production' ? 'info' : 'debug',
    prettyPrint: env.nodeEnv !== 'production',
    colorize: env.nodeEnv !== 'production',
    logRequests: true
  },
  
  // Timeouts
  timeout: 30000,  // 30 segundos
  keepAliveTimeout: 65000,
  
  // Compresión de respuestas
  compression: {
    enabled: true,
    level: 6,
    threshold: 1024  // Solo si > 1KB
  },
  
  // Seguridad básica
  helmet: {
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true
  },
  
  // Formato de respuestas
  response: {
    success: {
      includeMeta: true,
      wrapData: true
    },
    error: {
      includeStack: env.nodeEnv !== 'production',
      wrapError: true
    }
  },
  
  // Helpers de entorno
  env: env.nodeEnv,
  isDevelopment: env.nodeEnv === 'development',
  isProduction: env.nodeEnv === 'production',
  isTest: env.nodeEnv === 'test'
}