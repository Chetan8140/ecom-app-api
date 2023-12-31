var express = require('express');
var router = express.Router();
var CategoryControllers = require('../controllers/category')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/catimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })

  const upload = multer({ storage: storage })

router.post('/add',upload.single('image') ,CategoryControllers.ADDCATEGORY);

router.patch('/update/:id',upload.single('image') ,CategoryControllers.UPDATECATEGORY);

router.delete('/delete/:id',CategoryControllers.DELETECATEGORY);

router.get('/all',CategoryControllers.ALLCATEGORY);

module.exports = router;