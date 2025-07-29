const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Set up the server
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567',  // Replace with your MySQL password
    database: 'garment_store'  // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Sign-Up Endpoint
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password and save user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error hashing password' });
            }

            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ success: false, message: 'Error saving user' });
                }

                res.status(200).json({ success: true, message: 'User created successfully' });
            });
        });
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const user = result[0];

        // Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

            res.status(200).json({ success: true, message: 'Login successful', token });
        });
    });
});

// Endpoint to handle the order submission
app.post('/submitOrder', (req, res) => {
    const { product_name, product_price, customer_name, customer_email, customer_phone, customer_address } = req.body;

    if (!product_name || !product_price || !customer_name || !customer_email || !customer_phone || !customer_address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert the order data into the database
    const query = 'INSERT INTO orders (product_name, product_price, customer_name, customer_email, customer_phone, customer_address) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [product_name, product_price, customer_name, customer_email, customer_phone, customer_address], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ message: 'Error processing order' });
        }
        res.status(200).json({ message: 'Order submitted successfully' });
    });
});

// Endpoint to fetch all orders
app.get('/getOrders', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ message: 'Error fetching orders' });
        }
        res.json({ orders: results });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
