const {CustomPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res,next) => {
    if (err instanceof CustomPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: 'Something went wrong, please try again.'})
}

module.exports = errorHandlerMiddleware