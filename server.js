require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const multerUpload = require('./cloudinary/multerConfig').multerUpload;

const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')

const port = process.env.PORT
const host = process.env.HOST


const app = express();
app.use(cors());
// app.use(express.json())

app.use(multerUpload.single('img'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({message: "WORKING"})
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, host, () => console.log(`running on http://${host}:${port}`));
    } catch (e) {
        console.log(e)
    }
}

start()