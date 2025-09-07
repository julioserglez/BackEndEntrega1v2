const express = require('express');
const router = express.Router();

const ProductManager = require('../managers/ProductManager');
const productMger = new ProductManager();

//======== Rutas para Manejo de Productos [/api/products]===========//

// Obtener todos los productos [GET/]
router.get('/', (req, res) => {
  res.json(productMger.getProducts());
});

// Obtener un producto por id [GET/:pid]
router.get('/:id', (req, res) => {
  const prod = productMger.getProductById(Number(req.params.id));
  if (prod) return res.json(prod);
  res.status(404).json({ error: 'Producto no encontrado' });
});

// Agregar un producto [POST/]
router.post('/add', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const nuevo = productMger.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(nuevo);
});

// Actualizar un producto[PUT/:pid]
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = productMger.updateProduct(Number(id), req.body);
    if (updatedProduct) return res.json(updatedProduct);
    res.status(404).json({ error: 'Producto no encontrado' });
});

// Eliminar un producto[DELETE/:pid]
router.delete('/delete/:id', (req, res) => {
    const deleted = productMger.deleteProduct(Number(req.params.id));
    if (deleted) return res.status(204).send();
    res.status(404).json({ error: 'Producto no encontrado' });
});

module.exports = router;