const Router = require('express')
const router = new Router()
const detailController = require('../controllers/detailController')
router.post('/create', detailController.create)

router.get('/all', detailController.getAllDetails )
router.get('/:id?' , detailController.get_one);

module.exports = router