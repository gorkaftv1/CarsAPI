const Car = require('../models/Car');

// GET /cars - Obtener todos los coches
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll();

        res.status(200).json({ 
            success: true, 
            data: cars,
            count: cars.length 
        });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// GET /cars/:id - Obtener un coche por ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        // Si no existe, devolver 404
        if (!car) {
            return res.status(404).json({ 
                success: false, 
                error: 'Car not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: car 
        });
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// POST /cars - Crear un coche nuevo
const createCar = async (req, res) => {
    const { plate, make, model, year, kilometerage, image_url } = req.body;

    // Validar campos obligatorios
    if (!plate || !make || !model || !year) {
        return res.status(400).json({ 
            success: false, 
            error: 'Missing required fields: plate, make, model, year' 
        });
    }

    // Si no se envía kilometerage, asignar 0 por defecto
    if (!kilometerage) {
        req.body.kilometerage = 0;
    } else if (isNaN(kilometerage)) {
        // Validar que kilometerage sea un número
        return res.status(400).json({ 
            success: false, 
            error: 'Kilometerage must be a number' 
        });
    }

    try {
        // Verificar que la matrícula no exista ya (evitar duplicados)
        const existingCar = await Car.findByPlate(plate);
        if (existingCar) {
            return res.status(409).json({ 
                success: false, 
                error: 'Car with this plate already exists' 
            });
        }

        // Crear el coche en la base de datos
        const newCar = await Car.create({ 
            plate, 
            make, 
            model, 
            year, 
            kilometerage: req.body.kilometerage,
            image_url 
        });

        // Devolver 201 (Created) con el coche creado
        res.status(201).json({ 
            success: true, 
            data: newCar,
            message: 'Car created successfully'
        });
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// GET /cars/make/:make - Buscar coches por marca
const getCarsByMake = async (req, res) => {
    try {
        const cars = await Car.findByMake(req.params.make);

        res.status(200).json({ 
            success: true, 
            data: cars,
            count: cars.length 
        });
    } catch (error) {
        console.error('Error fetching cars by make:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// PUT /cars/:id - Actualizar un coche
const updateCar = async (req, res) => {
    try {
        const { plate, make, model, year, kilometerage, image_url } = req.body;

        // Validar que haya al menos un campo para actualizar
        if (!plate && !make && !model && !year && !kilometerage && !image_url) {
            return res.status(400).json({ 
                success: false, 
                error: 'No data to update' 
            });
        }

        // Verificar que el coche existe antes de actualizar
        const carExists = await Car.findById(req.params.id);
        if (!carExists) {
            return res.status(404).json({ 
                success: false, 
                error: 'Car not found' 
            });
        }

        // Actualizar el coche
        const updatedCar = await Car.update(req.params.id, req.body);

        res.status(200).json({ 
            success: true, 
            data: updatedCar,
            message: 'Car updated successfully'
        });
    } catch (error) {
        // Manejar error de matrícula duplicada
        if (error.code === '23505') {
            return res.status(409).json({ 
                success: false, 
                error: 'Plate already exists' 
            });
        }

        console.error('Error updating car:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// DELETE /cars/:id - Eliminar un coche
const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.delete(req.params.id);

        // Si no existe, devolver 404
        if (!deletedCar) {
            return res.status(404).json({ 
                success: false, 
                error: 'Car not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            data: deletedCar,
            message: 'Car deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};

// Exportar todas las funciones para usarlas en las rutas
module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    getCarsByMake
};