const Router = require('express')
const router = new Router()
const reviewController = require('../controller/reviewController')

router.post('/',reviewController.create)
router.get('/',reviewController.getAll)
router.get('/:id',reviewController.getAllForOne)

module.exports = router