const Router = require('express')
const router = new Router()
const detailRouter = require('./detailRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')



router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/detail', detailRouter)

module.exports = router