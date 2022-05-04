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

    async delete(req, res) {
        try {
            const {id} = req.body
            const answer = await Category.destroy({where: {ca_id: id}})
            return res.json(answer)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const {id, name} = req.body
            const answer = await Category.update({ca_name: name}, {where: {ca_id: id}})
            return res.json(answer)
        } catch (e) {
            console.log(e)
        }
        return res.json()
    }

    async getAll(req, res) {
        // const test_name = await Category.findOne({where:{ca_name:'test1'}})
        // if(test_name){
        //     console.log(test_name.getDataValue)
        // }
        const category = await Category.findAll()
        return res.json(category)
    }

}

module.exports = new CategoryController()