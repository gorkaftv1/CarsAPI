# Cars API 🚗

API REST para gestión de coches con Node.js, Express y PostgreSQL, desplegada con Docker.

## 🚀 Tecnologías

- **Node.js** v20
- **Express** - Framework web
- **PostgreSQL** 16 - Base de datos
- **Docker & Docker Compose** - Contenedores
- **pg** - Driver de PostgreSQL

## 📋 Prerrequisitos

- Docker
- Docker Compose
- Node.js 20+ (solo para desarrollo local sin Docker)

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repo-url>
cd API
```

### 2. Crear archivo `.env`

Crea un archivo `.env` en la raíz con:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=cars_db
DB_USER=postgres
DB_PASSWORD=tu_password_seguro
```

**⚠️ IMPORTANTE:** Cambia `DB_PASSWORD` por una contraseña segura.

### 3. Levantar con Docker

```bash
# Construir y levantar los contenedores
docker-compose up --build

# O en segundo plano
docker-compose up -d --build
```

Esto creará automáticamente:
- Contenedor de PostgreSQL con la base de datos
- Contenedor de la API
- Tabla `cars` con el schema definido

### 4. Verificar que funciona

Abre tu navegador en: `http://localhost:3000/health`

Deberías ver:
```json
{
  "success": true,
  "message": "API is running",
  "environment": "development"
}
```

## 📁 Estructura del Proyecto

```
API/
├── app.js                  # Punto de entrada
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
├── .dockerignore
└── src/
    ├── config/            # Configuraciones
    │   ├── env.js
    │   ├── db.js
    │   └── server.js
    ├── db/                # Base de datos
    │   ├── connection.js
    │   └── schema.sql
    ├── models/            # Modelos de datos
    │   └── Car.js
    ├── controllers/       # Lógica de negocio
    │   └── carController.js
    └── routes/            # Endpoints
        └── carRoutes.js
```

## 🔌 Endpoints

### Health Check
```
GET /health
```

### Coches

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/cars` | Listar todos los coches |
| `GET` | `/api/cars/:id` | Obtener un coche por ID |
| `GET` | `/api/cars/make/:make` | Buscar coches por marca |
| `POST` | `/api/cars` | Crear un coche nuevo |
| `PUT` | `/api/cars/:id` | Actualizar un coche |
| `DELETE` | `/api/cars/:id` | Eliminar un coche |

## 📝 Ejemplos de Uso

### Crear un coche

```bash
POST http://localhost:3000/api/cars
Content-Type: application/json

{
  "plate": "1234ABC",
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "kilometerage": 50000,
  "image_url": "https://example.com/car.jpg"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "plate": "1234ABC",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "kilometerage": 50000,
    "image_url": "https://example.com/car.jpg",
    "created_at": "2025-10-22T18:30:00.000Z"
  },
  "message": "Car created successfully"
}
```

### Listar todos los coches

```bash
GET http://localhost:3000/api/cars
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "plate": "1234ABC",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "kilometerage": 50000,
      "image_url": "https://example.com/car.jpg",
      "created_at": "2025-10-22T18:30:00.000Z"
    }
  ],
  "count": 1
}
```

### Actualizar un coche

```bash
PUT http://localhost:3000/api/cars/1
Content-Type: application/json

{
  "plate": "1234ABC",
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "kilometerage": 60000,
  "image_url": "https://example.com/car.jpg"
}
```

### Eliminar un coche

```bash
DELETE http://localhost:3000/api/cars/1
```

## 🛠️ Comandos útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs solo de la API
docker-compose logs -f api

# Ver logs solo de la base de datos
docker-compose logs -f db

# Parar los contenedores
docker-compose down

# Parar y eliminar volúmenes (borra la DB)
docker-compose down -v

# Reiniciar solo la API
docker-compose restart api

# Ver estado de los contenedores
docker-compose ps
```

## 🗄️ Schema de Base de Datos

### Tabla `cars`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL | ID autoincremental (PK) |
| `plate` | VARCHAR(15) | Matrícula (única) |
| `make` | VARCHAR(50) | Marca |
| `model` | VARCHAR(50) | Modelo |
| `year` | INT | Año (1886-presente) |
| `kilometerage` | INT | Kilometraje (≥0) |
| `image_url` | VARCHAR(255) | URL de imagen (opcional) |
| `created_at` | TIMESTAMP | Fecha de creación |

## 🔒 Seguridad

- Rate limiting: 100 peticiones/15min en producción
- CORS configurado
- Helmet para headers de seguridad
- Validación de datos en todos los endpoints
- Variables sensibles en `.env` (no versionadas)

## 🐛 Troubleshooting

### La API no arranca
```bash
# Ver logs de errores
docker-compose logs api
```

### Error de conexión a PostgreSQL
```bash
# Verificar que la DB está corriendo
docker-compose logs db

# Recrear volúmenes
docker-compose down -v
docker-compose up --build
```

### Puerto en uso
```bash
# Cambiar el PORT en .env
PORT=3001
```

## 📄 Licencia

ISC

## 👤 Autor

Gorka Eymard
