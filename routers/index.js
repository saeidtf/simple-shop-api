const userRouter = require('./user');

module.exports = (app) => {
    app.use('/users', userRouter);
}

