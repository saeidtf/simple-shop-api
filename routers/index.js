const userRouter = require('./user');
const productsRouter = require('./product');

module.exports = (app) => {
    app.use('/users', userRouter);
    app.use('/products', productsRouter);
}

