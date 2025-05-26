const express = require('express');
const app = express();
app.use(express.json());

app.post('/order', async (req, res) => {
  // 👈 Aquí empieza el nuevo código
  const orderData = req.body;

  console.log('Nuevo pedido recibido:', orderData);

  const shopifyDomain = 'cavelierofficial.myshopify.com'; // ← Reemplaza con tu dominio real
  const accessToken = process.env.SHOPIFY_TOKEN;

  const orderPayload = {
    order: {
      line_items: [
        {
          variant_id: orderData.variant_id,
          quantity: orderData.quantity || 1
        }
      ],
      customer: {
        first_name: orderData.first_name,
        last_name: orderData.last_name,
        email: orderData.email
      },
      shipping_address: {
        address1: orderData.address,
        city: orderData.city,
        zip: orderData.zip,
        phone: orderData.phone,
        first_name: orderData.first_name,
        last_name: orderData.last_name
      },
      financial_status: 'pending'
    }
  };

  try {
    const response = await fetch(`https://${shopifyDomain}/admin/api/2024-01/orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify(orderPayload)
    });

    const responseData = await response.json();

    if (response.ok) {
      res.status(200).json({ status: 'OK', order: responseData });
    } else {
      console.error('Error al crear pedido:', responseData);
      res.status(500).json({ error: 'No se pudo crear el pedido', details: responseData });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}); // 👈 Aquí termina el nuevo código

app.get('/', (req, res) => {
  res.send('App de pedidos para Shopify está funcionando.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
