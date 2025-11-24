const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

const productsRouter = require('../routes/products.router');
const cartsRouter = require('../routes/carts.router');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const viewsRouter = require('../routes/views.router');
app.use('/', viewsRouter);

module.exports = app;