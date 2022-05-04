const {Item, Category} = require('../models/models')
const cloudinary = require('../cloudinary/cloudinaryConfig')
const multer = require('../cloudinary/multerConfig')

const uploader = cloudinary.uploader
const datauri = multer.datauri


class ItemController {

    static async saveImg(req) {
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
    }

    async create(req, res) {
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
                it_description:description,
                // it_date_add: '2022-05-02 11:04:29.720 +00:00'
            })
            return res.json(item)
        } catch (e) {
            console.log(e)
        }

    }


    async delete(req, res) {
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
            console.log(e)
        }
    }


    async update(req, res) {
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
            console.log(e)
        }
    }

    async getAll(req, res) {
        let {itemId, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = (page - 1) * limit

        let items;
        if (!itemId && !categoryId) {
            items = await Item.findAll({limit, offset})
        } else if (!itemId && categoryId) {
            items = await Item.findAll({where: {categoryCaId: categoryId}, limit, offset})
        } else if (itemId && !categoryId) {
            items = await Item.findAll({where: {it_id: itemId}, limit, offset})
        } else if (itemId && categoryId) {
            items = await Item.findAll({where: {it_id: itemId, categoryCaId: categoryId}, limit, offset})
        }
        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = Item.findOne({where: id})
        return res.json(item)
    }
}

module.exports = new ItemController()