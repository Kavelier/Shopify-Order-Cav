
const express = require('express');
const app = express();
app.use(express.json());

app.post('/order', (req, res) => {
  const orderData = req.body;
  console.log('Nuevo pedido recibido:', orderData);
  res.json({ status: 'Pedido recibido', data: orderData });
});

app.get('/', (req, res) => {
  res.send('App de pedidos para Shopify está funcionando.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
