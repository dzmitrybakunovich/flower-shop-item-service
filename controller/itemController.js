const {Item} = require('../models/models')
const cloudinary = require('../cloudinary/cloudinaryConfig')
const multer = require('../cloudinary/multerConfig')

const uploader = cloudinary.uploader
const datauri = multer.datauri


class ItemController {

    async create(req, res) {
        try {
            const {name, price, owner, category} = req.body
            let img_url;
            if (req.file) {
                const file = datauri(req)
                await uploader.upload(file.content,
                    {dpr: "auto", responsive: true, width: "auto", crop: "scale"},
                    (error, result) => {
                        img_url = result.secure_url.toString()
                    });
            }
            const item = await Item.create({
                it_name: name,
                it_price: price,
                it_img: img_url,
                it_owner: owner,
                categoryCaId: category,
                it_date_add: '2022-05-02 11:04:29.720 +00:00'
            })
            return res.json(item)
        } catch (e) {
            console.log(e)
        }

    }


    async getAll(req, res) {
        const items = await Item.findAll()
        return res.json(items)
    }


    async getOne(req, res) {

    }
}

module.exports = new ItemController()