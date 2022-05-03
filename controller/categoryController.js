const {Category} = require('../models/models');

class CategoryController {

    async create(req, res) {
        try {
            const {name} = req.body
            const category = await Category.create({ca_name: name})
            return res.json(category)
        } catch (e) {
            console.log(e)
        }

    }


    async getAll(req, res) {
        const category = await Category.findAll()
        return res.json(category)
    }


    async getOne(req, res) {

    }
}

module.exports = new CategoryController()