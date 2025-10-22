const pool = require('../db/connection')

class Car {

    static async create(carData) {
        const { plate, make, model, year, kilometerage, image_url } = carData
        const query = `
            INSERT INTO cars (plate, make, model, year, kilometerage, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `
        const values = [plate, make, model, year, kilometerage, image_url]
        const result = await pool.query(query, values)
        return result.rows[0]
    }

    static async findAll() {
        const query = `SELECT * FROM cars ORDER BY created_at DESC`
        const result = await pool.query(query)
        return result.rows
    }

    static async findById(id) {
        const query = `SELECT * FROM cars WHERE id = $1`
        const values = [id]
        const result = await pool.query(query, values)
        return result.rows[0]
    }

    static async findByPlate(plate) {
        const query = `SELECT * FROM cars WHERE plate = $1`
        const values = [plate]
        const result = await pool.query(query, values)
        return result.rows[0]
    }

    static async findByMake(make) {
        const query = `SELECT * FROM cars WHERE make ILIKE $1`
        const values = [`%${make}%`]
        const result = await pool.query(query, values)
        return result.rows
    }

    static async delete(id) {
        const query = `DELETE FROM cars WHERE id = $1 RETURNING *`
        const values = [id]
        const result = await pool.query(query, values)
        return result.rows[0]
    }

    static async update(id, carData) {
        const { plate, make, model, year, kilometerage, image_url } = carData
        const query = `
            UPDATE cars
            SET plate = $1, make = $2, model = $3, year = $4, kilometerage = $5, image_url = $6
            WHERE id = $7
            RETURNING *
        `
        const values = [plate, make, model, year, kilometerage, image_url, id]
        const result = await pool.query(query, values)
        return result.rows[0]
    }

}

module.exports = Car