const express = require('express');
const router = express.Router();

const CartManager = require('../managers/cartManager');
const cartMger = new CartManager(); 

//======== Rutas para Manejo de Carritos [/api/carts]===========//

///Crear un nuevo carrito [POST/]
router.post('/', (req, res) => {
    const nuevo = cartMger.addCart();
    res.status(201).json(nuevo);
}); 

// Obtener un carrito por id [GET/:cid]
router.get('/:cid', (req, res) => {
    const cart = cartMger.getCartById(Number(req.params.cid));
    if (cart) return res.json(cart);
    res.status(404).json({ error: 'Carrito no encontrado' });
});

// Agregar producto a un carrito [POST/:cid/product/:pid]
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    if (!cid || !pid ) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const nuevo = cartMger.addProductoCart({ cid, pid});
    res.status(201).json(nuevo);
});

module.exports = router;