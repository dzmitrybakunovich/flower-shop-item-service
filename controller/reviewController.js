const {Review} = require('../models/models');

class ReviewController {

    async create(req, res) {
        const {ca_name} = req.body
        const type = await Review.create({ca_name})
        return res.json(type)
    }


    async getAll(req, res) {
        const review = await Review.findAll()
        return res.json(review)
    }

    async getAllForOne(req, res){

    }
}

module.exports = new ReviewController()