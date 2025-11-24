const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const ProductManager = require('../managers/productManager');
const pm = new ProductManager('data/products.json');

const server = http.createServer(app);
const io = new Server(server);

app.set('socketio', io);

io.on('connection', async (socket) => {
    console.log("Cliente conectado:", socket.id);

    const productos = await pm.getAll();
    socket.emit('updateProducts', productos);

    socket.on('newProduct', async (data) => {
        try {
            const newProduct = await pm.add(data);
            console.log("📥 Producto agregado:", newProduct);

            const updatedProducts = await pm.getAll();
            io.emit('updateProducts', updatedProducts);
        } catch (err) {
            console.error("Error agregando producto:", err.message);
            socket.emit('error', err.message);
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            const deleted = await pm.delete(productId);
            if (!deleted) {
                socket.emit('error', 'Producto no encontrado');
                return;
            }
            console.log("Producto eliminado:", productId);

            const updatedProducts = await pm.getAll();
            io.emit('updateProducts', updatedProducts);
        } catch (err) {
            console.error("Error eliminando producto:", err.message);
            socket.emit('error', err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
