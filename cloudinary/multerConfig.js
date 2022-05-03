const multer = require('multer')
const Datauri = require('datauri/parser')
const path = require('path')

const storage = multer.memoryStorage()
const multerUpload = multer({storage})

const dUri = new Datauri()

const datauri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)

module.exports = {multerUpload, datauri}