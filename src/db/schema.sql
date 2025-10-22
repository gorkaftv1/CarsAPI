DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(15) UNIQUE NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL CHECK (year > 1885 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)),
  kilometerage INT NOT NULL CHECK (kilometerage >= 0),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- Agregar un índice en la columna 'make' para mejorar el rendimiento de las consultas
CREATE INDEX idx_cars_make ON cars(make);