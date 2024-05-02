const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type:Number,
        default: 0,
        min: [0, 'Rating can not be negative number.'],
        max: [5 , 'Rating can not greater than 5.' ]
    },
    createAt: {
        type:Date,
        default: Date.now()
    },
    name: {
        type:String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength:[20, 'Name can not be more than 20 characters'],
    },
    price: {
        type:Number,
        min: [1, 'Price can not be negative number.'],
        require:[true, 'Product must have price.']
    },
    company: {
        type:String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported. '
        }
        // enum:['ikea', 'liddy', 'caressa', 'marcos']
        // required: [true, "Company name is required."],
        // trim: true,
        // minLength: [3, "Company name must be at least 3 characters"],
        // maxLength:[50, 'Company name can not be more than 50 characters'],
    }
})

module.exports = mongoose.model('Product', ProductsSchema)