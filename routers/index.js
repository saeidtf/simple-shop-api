const userRouter = require('./user');
const productsRouter = require('./product');
const ordersRouter = require('./order');
const slidersRouter = require('./slider');
const contactRouter = require('./contact');

module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/products', productsRouter);
    app.use('/orders', ordersRouter);
    app.use('/sliders', slidersRouter);
    app.use('/contacts', contactRouter);
}

