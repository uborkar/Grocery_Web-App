-- Create database
CREATE DATABASE IF NOT EXISTS garment_store;

-- Use the database
USE garment_store;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    customer_address TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Admin User
INSERT INTO users (email, password) VALUES
('admin@example.com', 'admin123');
