class CustomPIError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.statusCode = statusCode
    }
} 

const createCustomError = (msg,statusCode) => {
    return new CustomPIError(msg, statusCode)
}

module.exports = {createCustomError, CustomPIError}