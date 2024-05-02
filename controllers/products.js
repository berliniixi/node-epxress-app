const Product = require('../models/products')

const getAllProductsStatic = async (req,res) => {
    res.status(200).json({msg: 'products static route'})
}

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({products: products})
        console.log("products: ", products.length);
    } catch (error) {
        res.status(500).json(error)
    } 
}

const createProduct = async (req,res) => {
    try {
        const product = await Product.create(req.body)
        if(!product) {
            return res.status(404).json({success: false , msg: "Product is require to have price" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.errors)
    }
}

module.exports = {getAllProductsStatic, getAllProducts,createProduct}