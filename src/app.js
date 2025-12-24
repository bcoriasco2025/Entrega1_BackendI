const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const app = express();

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static 
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars 
const handlebars = exphbs.create({
    helpers: {
    multiply: (a, b) => a * b,
    eq: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
});

//  Session 
app.use(session({
  secret: 'secreto-super-cart',
  resave: false,
  saveUninitialized: true
}));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Routes 
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

module.exports = app;
