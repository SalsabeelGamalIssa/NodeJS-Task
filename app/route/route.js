const router = require('express').Router();
const controller=require('../controller/controller')
const pageination=require('../middleware/pagination')

router.get('/list/:page?/:limit?',controller.get_Allproducts);

router.get('/categoryProducts/:categoryId/:limit?',controller.get_CategoryProducts);

router.get('/set/:productId',controller.toggleAvailable);






module.exports = router











