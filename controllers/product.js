const PRODUCT = require('../model/product')

exports.ADDPRODUCT = async function (req,res,next){
     try {
        const thum =req.files.thumbnail
        thum.map((el)=>{
            req.body.thumbnail=el.filename
        })

        req.body.images = [];
        const file = req.files.images
        file.map((el) => {
            req.body.images.push(el.filename)
        })
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.discountPercentage || !req.body.rating || !req.body.stock || !req.body.brand || !req.body.thumbnail || !req.body.images.length || !req.body.category) {
            throw new Error("please enter valid field")
        }
        const addproduct = await PRODUCT.create(req.body)
        res.status(201).json({
            status: "successfully",
            massage: "product is added",
            addproduct: addproduct
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            massage: error.massage
        })
    }
}

exports.UPDATEPRODUCT = async function (req,res,next){
    try {
        
        const getdata = await PRODUCT.findById(req.params.id)
        const data = { ...getdata._doc, ...req.body }

        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail
            thumbnail.map((el)=>{
                data.thumbnail=el.filename
            })
            // console.log(thumbnail);
        } 
        
        
        if (req.files && req.files.images) {
            data.images = [];
            const file = req.files.images
            file.map((el) => {
                data.images.push(el.filename)
            })
        }
        await PRODUCT.findByIdAndUpdate(req.params.id, data)
        res.status(200).json({
            status: "sucessfully",
            message: "Product is updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.DELETEPRODUCT = async function (req,res,next){
    try {
        await PRODUCT.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessfully",
            message: "product is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.ALLPRODUCT = async function (req,res,next){
    try {
        const allproduct = await PRODUCT.find()
        res.status(200).json({
            status: "successfully",
            massage: "Product is found",
            allproduct : allproduct
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            massage: error.massage
        })
    }
}

exports.SEARCHBLOG = async function (req, res, next) {
    try {
        const search = await PRODUCT.find().populate("category")

        res.status(200).json({
            status: "sucessfully",
            message: "Product is search",
            search: search
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};