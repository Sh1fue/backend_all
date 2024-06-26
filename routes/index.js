const Router = require('express')
const router = new Router()
const detailRouter = require('./detailRouter')
const userRouter = require('./userRouter')



router.use('/user', userRouter)
router.use('/detail', detailRouter)


module.exports = router