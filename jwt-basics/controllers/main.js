const jwt = require('jsonwebtoken')

const {BadRequest} = require('../errors/index')

const login = async (req,res) => {

    const id = new Date().getDate()
    const {username, password} = req.body

    if(!username || !password){
        throw new BadRequest('Please provide email & password') 
    }


    const token = jwt.sign({id,username}, process.env.JWT_SECRET , {expiresIn: '30d'})


    res.status(200).json({msg: 'User created successfully', token})
}

const dashboard = async (req,res) => {

    const {user} = req

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, ${user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`}) 
}

module.exports = {login, dashboard}