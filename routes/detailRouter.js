const Router = require('express')
const router = new Router()
const detailController = require('../controllers/detailController')
router.post('/create', detailController.create)

router.get('/all', detailController.get_all)
router.get('/getone' , detailController.get_one)

module.exports = router