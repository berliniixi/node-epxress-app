const jwt = require('jsonwebtoken')

const {Unauthenticated} = require('../errors/index')

const authenticationMid = async (req,res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthenticated('No token provided.') 
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const {id,username} = decoded
        req.user = {id,username}
        // console.log("decoded: ", decoded);
        next()
    } catch (error) {
        throw new Unauthenticated('Not authorize to access this route. ') 
       
    } 

}

module.exports = authenticationMid