class AppError extends Error {
    // the constructor method is going to be call everytime that we create a new object out of this class
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        //all error created by us is operational errors
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;