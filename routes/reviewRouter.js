const Router = require('express')
const router = new Router()
const reviewController = require('../controller/reviewController')

router.post('/',reviewController.create)
router.delete('/',reviewController.delete)
router.get('/',reviewController.getAll)

module.exports = router