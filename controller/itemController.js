const {Item, Category} = require('../models/models')
const cloudinary = require('../cloudinary/cloudinaryConfig')
const multer = require('../cloudinary/multerConfig')
const ApiError = require('../error/apiError')

const uploader = cloudinary.uploader
const datauri = multer.datauri


class ItemController {

    static async saveImg(req) {
        try {
            let img_url;
            if (req.file) {
                const file = datauri(req)
                await uploader.upload(file.content,
                    {dpr: "auto", responsive: true, width: "auto", crop: "scale"},
                    (error, result) => {
                        img_url = result.secure_url.toString()
                    });
            }
            return img_url
        } catch (e) {
            ApiError.badRequest(e)
        }

    }

    async create(req, res, next) {
        try {
            let {name, price, owner, category, description} = req.body

            category = await Category.findOne({where: {ca_name: category}})
            if (category) {
                category = category.getDataValue('ca_id')
            } else {
                category = (await Category.findOne()).getDataValue('ca_id')
            }

            const img_url = await ItemController.saveImg(req)
            const item = await Item.create({
                it_name: name,
                it_price: parseInt(price),
                it_img: img_url,
                it_owner: owner,
                categoryCaId: category,
                it_description: description,
                // it_date_add: '2022-05-02 11:04:29.720 +00:00'
            })
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e))
        }

    }


    async delete(req, res, next) {
        try {
            const {id} = req.body
            let img_path = (await Item.findOne({where: {it_id: id}})).getDataValue('it_img')
            if (img_path) {
                img_path = img_path.split(/[\/.]/)
                img_path = img_path [img_path.length - 2]
                await uploader.destroy(img_path)
            }
            const answer = await Item.destroy({where: {it_id: id}})
            return res.json(answer)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }


    async update(req, res, next) {
        try {
            let {id, name, price, owner, category, description} = req.body

            category = await Category.findOne({where: {ca_name: category}})
            if (category) {
                category = category.getDataValue('ca_id')
            } else {
                category = (await Category.findOne()).getDataValue('ca_id')
            }

            let img_path = (await Item.findOne({where: {it_id: id}})).getDataValue('it_img')
            if (img_path) {
                img_path = img_path.split(/[\/.]/)
                img_path = img_path [img_path.length - 2]
                await uploader.destroy(img_path)
            }

            const img_url = await ItemController.saveImg(req)

            const item = await Item.update({
                it_name: name,
                it_price: price,
                it_img: img_url,
                it_owner: owner,
                categoryCaId: category,
                it_description: description,
                // it_date_add: DATE.curr
            }, {where: {it_id: id}})
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }

    static parseOrder(order) {
        try {
            let answer = ['it_date_add','ASC']
            if (order) {
                order = order.split(/:/)
                if (order.length !== 2) {
                    return answer
                }
                if (order[0] === 'price') {
                    answer[0] = 'it_price'
                }
                if (order[1] === 'desc') {
                    answer[1] = 'DESC'
                    console.log(order)
                }
            }
            return answer
        } catch (e) {
            ApiError.badRequest(e)
        }

    }

    async getAll(req, res, next) {
        try {
            let {category, limit, page, order} = req.query

            order = ItemController.parseOrder(order)
            page = parseInt(page) > 0 || 1
            limit = parseInt(limit) > 0 || 10
            let offset = (page - 1) * limit
            let items;
            if (category) {
                category = await Category.findOne({where: {ca_name: category}})
                category = category.getDataValue('ca_id')
                items = await Item.findAll({where: {categoryCaId: category}, limit, offset, order: [order]})
            } else {
                items = await Item.findAll({limit, offset, order: [order]})
            }
            // if (!itemId && !categoryId) {
            //     items = await Item.findAll({limit, offset})
            // } else if (!itemId && categoryId) {
            //     items = await Item.findAll({where: {categoryCaId: categoryId}, limit, offset})
            // } else if (itemId && !categoryId) {
            //     items = await Item.findAll({where: {it_id: itemId}, limit, offset})
            // } else if (itemId && categoryId) {
            //     items = await Item.findAll({where: {it_id: itemId, categoryCaId: categoryId}, limit, offset})
            // }
            return res.json(items)
        } catch (e) {
            next(ApiError.badRequest(e))
        }

    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findAll({where: {it_id: id}})
        return res.json(item)
    }


}

module.exports = new ItemController()