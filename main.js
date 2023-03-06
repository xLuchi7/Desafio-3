import express from 'express';
import { ProductManager } from './ProductManager.js';
import { Product } from './Product.js';
import { randomUUID } from 'crypto';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsManager = new ProductManager('./database/products.json');

app.get('/products', async (req, res) => {
    try {
        const products = await productsManager.buscarProductos()
        res.json(products);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productsManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

app.get('/productss/:pcant', async (req, res) => {
    try {
        const cantProducts = await productsManager.getCantProducts(req.params.pcant);
        res.json(cantProducts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

const server = app.listen(8080);

