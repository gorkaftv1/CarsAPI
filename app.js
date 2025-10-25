const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Importar configuraciones
const serverConfig = require('./src/config/server');
const pool = require('./src/db/connection');
const { specs, swaggerUi } = require('./src/config/swagger');

// Importar rutas
const carRoutes = require('./src/routes/carRoutes');

// Inicializar Express
const app = express();

// Middlewares de seguridad
app.use(helmet(serverConfig.helmet));
app.use(cors(serverConfig.cors));

// Body parsers
app.use(express.json(serverConfig.bodyParser.json));
app.use(express.urlencoded(serverConfig.bodyParser.urlencoded));

// Compresión
if (serverConfig.compression.enabled) {
  app.use(compression({
    level: serverConfig.compression.level,
    threshold: serverConfig.compression.threshold
  }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: serverConfig.rateLimit.windowMs,
  max: serverConfig.rateLimit.max,
  message: serverConfig.rateLimit.message,
  standardHeaders: serverConfig.rateLimit.standardHeaders,
  legacyHeaders: serverConfig.rateLimit.legacyHeaders
});
app.use(limiter);

// Logger de peticiones (solo en desarrollo)
if (serverConfig.logging.logRequests) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Cars API Documentation',
}));

// Rutas
app.use('/cars', carRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar el estado de la API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: API is running
 *                 environment:
 *                   type: string
 *                   example: development
 */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'API is running',
    environment: serverConfig.env
  });
});

// Ruta 404 - No encontrada
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(serverConfig.response.error.includeStack && { stack: err.stack })
  });
});

// Arrancar servidor
app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`✅ Server running on ${serverConfig.host}:${serverConfig.port}`);
  console.log(`📦 Environment: ${serverConfig.env}`);
  console.log(`🔗 Health check: http://localhost:${serverConfig.port}/health`);
  console.log(`📚 API Docs: http://localhost:${serverConfig.port}/api-docs`);
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server...');
  await pool.end();
  process.exit(0);
});