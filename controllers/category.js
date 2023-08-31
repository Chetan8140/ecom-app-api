const CATEGORY = require('../model/category')

exports.ADDCATEGORY = async function (req, res, next) {
    try {
            // console.log(req.body.image);
            req.body.image=req.file.filename
         const addcategory = await CATEGORY.create(req.body)
         res.status(201).json({
             status : "successfully",
             massage : "Category is added",
             addcategory : addcategory
         })
     } catch (error) {
         res.status(401).json({
             status : "fail",
             massage : error.massage
         })
     }
}

exports.UPDATECATEGORY = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            status: "successfully",
            massage: "Category is updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            massage: error.massage
        })
    }
}

exports.DELETECATEGORY = async function (req, res, next) {
    try {
        await CATEGORY.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "successfully",
            massage: "Category is deleted",
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            massage: error.massage
        })
    }
}

exports.ALLCATEGORY = async function (req, res, next) {
    try {
        const allcatyegory = await CATEGORY.find()
        res.status(200).json({
            status: "successfully",
            massage: "Category is found",
            allcatyegory : allcatyegory
        })
    } catch (error) {
        res.status(401).json({
            status: "fail",
            massage: error.massage
        })
    }
}