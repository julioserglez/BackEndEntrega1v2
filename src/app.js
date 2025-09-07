const express = require ('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const routerCarts = require('./routers/routerCarts');
const routerProducts = require('./routers/routerProducts');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/carts', routerCarts);
app.use('/api/products', routerProducts);


///asigna el purto a la app 
app.listen(port, () => {
  console.log(`Servidor escuchando la url http://localhost:${port}`);
});

