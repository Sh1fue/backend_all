const Router = require('express')
const router = new Router()
const TypeControler = require('../controllers/typeController')
const typeController = require('../controllers/typeController')
router.post('/', typeController.create)

router.get('/',typeController.get_all)

module.exports = router