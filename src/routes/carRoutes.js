const express = require('express');
const router = express.Router();

const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getCarsByMake
} = require('../controllers/carController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - plate
 *         - make
 *         - model
 *         - year
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del vehículo
 *           example: 1
 *         plate:
 *           type: string
 *           description: Matrícula del vehículo
 *           example: "ABC-1234"
 *         make:
 *           type: string
 *           description: Marca del vehículo
 *           example: "Toyota"
 *         model:
 *           type: string
 *           description: Modelo del vehículo
 *           example: "Corolla"
 *         year:
 *           type: integer
 *           description: Año del vehículo
 *           example: 2023
 *         kilometerage:
 *           type: number
 *           description: Kilometraje del vehículo
 *           example: 15000
 *         image_url:
 *           type: string
 *           description: URL de la imagen del vehículo
 *           example: "https://example.com/car.jpg"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *     
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *         message:
 *           type: string
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Error message"
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Obtener todos los vehículos
 *     description: Retorna una lista con todos los vehículos registrados en la base de datos
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                 count:
 *                   type: integer
 *                   description: Número total de vehículos
 *                   example: 10
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAllCars);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     description: Registra un nuevo vehículo en la base de datos
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plate
 *               - make
 *               - model
 *               - year
 *             properties:
 *               plate:
 *                 type: string
 *                 example: "ABC-1234"
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Corolla"
 *               year:
 *                 type: integer
 *                 example: 2023
 *               kilometerage:
 *                 type: number
 *                 example: 15000
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/car.jpg"
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *                 message:
 *                   type: string
 *                   example: "Car created successfully"
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Ya existe un vehículo con esa matrícula
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Car with this plate already exists"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createCar);

/**
 * @swagger
 * /cars/make/{make}:
 *   get:
 *     summary: Buscar vehículos por marca
 *     description: Retorna una lista de vehículos que coincidan con la marca especificada
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: make
 *         required: true
 *         schema:
 *           type: string
 *         description: Marca del vehículo a buscar
 *         example: "Toyota"
 *     responses:
 *       200:
 *         description: Lista de vehículos de la marca especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *                 count:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/make/:make', getCarsByMake);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Obtener un vehículo por ID
 *     description: Retorna los datos de un vehículo específico
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *         example: 1
 *     responses:
 *       200:
 *         description: Datos del vehículo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Vehículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Car not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Actualizar un vehículo
 *     description: Actualiza los datos de un vehículo existente
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plate:
 *                 type: string
 *                 example: "ABC-1234"
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Corolla"
 *               year:
 *                 type: integer
 *                 example: 2023
 *               kilometerage:
 *                 type: number
 *                 example: 20000
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/car-updated.jpg"
 *     responses:
 *       200:
 *         description: Vehículo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *                 message:
 *                   type: string
 *                   example: "Car updated successfully"
 *       400:
 *         description: No hay datos para actualizar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Vehículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Car not found"
 *       409:
 *         description: La matrícula ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Plate already exists"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     description: Elimina un vehículo de la base de datos
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Vehículo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *                 message:
 *                   type: string
 *                   example: "Car deleted successfully"
 *       404:
 *         description: Vehículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Car not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteCar);

module.exports = router;