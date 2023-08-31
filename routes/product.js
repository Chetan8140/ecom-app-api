var express = require('express');
var router = express.Router();
var ProductControllers = require('../controllers/product')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/prodimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 5 }])



router.post('/add',cpUpload,ProductControllers.ADDPRODUCT)

router.patch('/update/:id',cpUpload,ProductControllers.UPDATEPRODUCT)

router.delete('/delete/:id',ProductControllers.DELETEPRODUCT)

router.get('/all',ProductControllers.ALLPRODUCT)


module.exports = router;