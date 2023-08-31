const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username : {
        type : String,
        unique : true
    } ,
    email : String,
    password : String
})

const LOGIN = mongoose.model('login',loginSchema)

module.exports = LOGIN