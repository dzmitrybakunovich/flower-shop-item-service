const {Review} = require('../models/models');
const ApiError = require('../error/apiError')

class ReviewController {

    async create(req, res, next) {
        try {
            const {item_id, user_id} = req.body
            // const {owner} = (await Item.findOne({where: {it_id: item_id}})).getDataValue('it_owner')
            const type = await Review.create({
                re_id_item: item_id,
                re_id_owner: user_id,
            })
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }


    async delete(req, res, next) {
        try {
            const {id} = req.body
            const answer = await Review.destroy({where: {re_id: id}})
            return res.json(answer)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }


    async getAll(req, res) {
        const {id} = req.query
        let review
        if (id) {
            review = await Review.findAll({where: {itemItId: id}})
        } else {
            review = await Review.findAll()
        }
        return res.json(review)
    }

    // async getAllForOne(req, res){
    //
    // }
}

module.exports = new ReviewController()