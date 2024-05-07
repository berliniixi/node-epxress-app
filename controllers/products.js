const Product = require('../models/products')

const getAllProductsStatic = async (req,res) => {
    // .sort('property to search') adding negative sign in front of property search it reverse the changes
    // so if .sort('-name') will start from w-a 
    // if .sort('name') will start from a-w

    // const productsWithFeatureTrue = await Product.find({}).sort('name price')

    // .select method allows you to choose specific attr for the object to show
    // .limit method allows you to specified how many items to return
    // $gt property (greater than)
    // $lt property (less than)
    const productsWithFeatureTrue = await Product.find({price: {$gt: 110}}).select('name price company').limit().skip()

    res.status(200).json({products: productsWithFeatureTrue, length: productsWithFeatureTrue.length})
}

const getAllProducts = async (req,res) => {
    try {
        const {featured,company,name, sort, fields, numericFilters} = req.query

        const queryObj = {}

        if(featured){
            queryObj.featured = featured === 'true' ? true : false
        }

        if(company){
            queryObj.company = company
        }

        if(name){
            // url to implement regex functionality in our query params
            // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex
            queryObj.name = {$regex :name, $options: 'i'}
        }

        // filtering by price
        if(numericFilters){
            const operatorMap = {
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<':'$lt',
                '<=':'$lte',
            }

            const regEx = /\b(<|>|>=|=|<|<=)\b/g
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
            const options = ['price', 'rating']
            filters = filters.split(',').forEach(item => {
                const [field,operator,value] = item.split('-')
                if (options.includes(field)) {
                    queryObj[field] = {[operator]: Number(value)}
                }
            })            
        }


        console.log("queryObj", queryObj);
        let result =  Product.find(queryObj)

        if(sort){
            const sortList = sort.split(',').join(' ')

            result = result.sort(sortList)
            console.log(sortList);
        }
        else {
            result = result.sort('createAt')
        }

        //fields query allows you to specified fields you want to represent for the user 
        if (fields) {
            const fieldsList = fields.split(',').join(' ')

            result = result.select(fieldsList)
        }

        
        // pagination functionality
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page-1)*limit 

        result = result.skip(skip).limit(limit)
        const products = await result

        res.status(200).json({products: products, page:page ,items: products.length})
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