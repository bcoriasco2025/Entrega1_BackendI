const express = require('express');
const productsRouter = require('../routes/products.router');
const cartsRouter = require('../routes/carts.router');

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Productos & Carrito</title>
            <style>
                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    background: linear-gradient(135deg, #d7e1ec, #fefefe);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    color: #333;
                }

                h1 {
                    color: #1976d2;
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 1.1rem;
                    margin-bottom: 20px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    gap: 20px; /* separación entre botones */
                    flex-wrap: wrap; /* permite que se acomoden en pantallas chicas */
                    justify-content: center;
                }

                li {
                    margin: 0;
                }

                a {
                    text-decoration: none;
                    color: white;
                    background-color: #1976d2;
                    padding: 10px 20px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    font-weight: 500;
                    display: inline-block;
                    min-width: 150px;
                    text-align: center;
                }

                a:hover {
                    background-color: #0d47a1;
                    transform: scale(1.05);
                }

                footer {
                    position: absolute;
                    bottom: 15px;
                    font-size: 0.9rem;
                    color: #555;
                }

                .card {
                    background: white;
                    padding: 2rem 3rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    animation: fadeIn 1s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>API de Productos de Limpieza</h1>
                <p>Servidor funcionando correctamente</p>
                <ul>
                    <li><a href="/api/products">Ver Productos</a></li>
                    <li><a href="/api/carts">Ver Carritos</a></li>
                </ul>
            </div>
            <footer>Desarrollado por Brenda Coriasco</footer>
        </body>
        </html>
    `);
});

app.use((req, res) => {
    res.status(404).send(`
        <h2 style="color: red; text-align: center;">Error 404 - Endpoint no encontrado</h2>
    `);
});

module.exports = app;