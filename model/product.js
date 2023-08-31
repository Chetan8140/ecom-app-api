const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    discountPercentage : String,
    rating : Number,
    stock : Number,
    brand : String,
    thumbnail : String,
    images : [String],
    category : { type: Schema.Types.ObjectId, ref: 'category' }

})

const PRODUCT = mongoose.model('product',productSchema)

module.exports = PRODUCT