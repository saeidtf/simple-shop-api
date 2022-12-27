const userRouter = require('./user');
const productsRouter = require('./product');
const ordersRouter = require('./order');

module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/products', productsRouter);
    app.use('/orders', ordersRouter);
}

