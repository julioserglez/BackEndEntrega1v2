const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.Path = path.join(__dirname, '../data/carts.json');
        this.carritos = JSON.parse(fs.readFileSync(this.Path, 'utf-8'));
    }

    getCarts() {
        return this.carritos;
    }

    getCartById(id) {
        return this.carritos.find(p => p.id === id);
    }

    addProductoCart({ cid, pid }) {
        const cartIndex = this.carritos.findIndex(c => c.id === parseInt(cid)); 
        if (cartIndex === -1) {
            const nuevoCarrito = this.addCart();
            nuevoCarrito.products.push({ product: parseInt(pid), quantity: 1 });
            fs.writeFileSync(this.Path, JSON.stringify(this.carritos, null, 2));
            return nuevoCarrito;

        }else {
            const productInCart = this.carritos[cartIndex].products.find(p => p.product === parseInt(pid));
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                this.carritos[cartIndex].products.push({ product: parseInt(pid), quantity: 1 });
            }   
            fs.writeFileSync(this.Path, JSON.stringify(this.carritos, null, 2));
            return this.carritos[cartIndex];
        }
    }

    addCart() {
        const newId = this.carritos.length ? this.carritos[this.carritos.length - 1].id + 1 : 1;
        const nuevoCarrito = { id: newId, products: [] };
        this.carritos.push(nuevoCarrito);
        fs.writeFileSync(this.Path, JSON.stringify(this.carritos, null, 2));
        return nuevoCarrito;
    }

}

module.exports = CartManager;