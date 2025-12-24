require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./src/database/connect');
const app = require('./src/app');

connectDB();

const server = http.createServer(app);

const io = new Server(server);

app.set('io', io);

const ProductService = require('./src/services/ProductService');

io.on('connection', async (socket) => {
  console.log('Cliente conectado por socket');

  const products = await ProductService.getProducts({});
  socket.emit('updateProducts', products.docs);

  socket.on('newProduct', async (data) => {
    await ProductService.createProduct(data);
    const products = await ProductService.getProducts({});
    io.emit('updateProducts', products.docs);
  });

  socket.on('deleteProduct', async (productId) => {
    await ProductService.deleteProduct(productId);
    const products = await ProductService.getProducts({});
    io.emit('updateProducts', products.docs);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
