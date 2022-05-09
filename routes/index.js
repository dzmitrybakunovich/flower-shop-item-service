
const Router = require('express')
const router = new Router()

const categoryRouter = require('./categoryRouter')
const itemRouter = require('./itemRouter')
const reviewRouter = require('./reviewRouter')


router.use('/review', reviewRouter)
router.use('/item', itemRouter)
router.use('/category', categoryRouter)

module.exports = router