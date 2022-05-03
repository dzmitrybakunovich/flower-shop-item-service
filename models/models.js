const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Item = sequelize.define('item', {
    it_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    it_name: {type: DataTypes.STRING, allowNull: false},
    it_price: {type: DataTypes.INTEGER, allowNull: false},
    it_img: {type: DataTypes.STRING},
    it_date_add: {type: DataTypes.DATE},
    it_owner: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    ca_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ca_name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Review = sequelize.define('review', {
    re_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    re_content: {type: DataTypes.STRING},
    re_mark: {type: DataTypes.INTEGER, default_value: 0.0, maxValue: 5},
    re_date: {type: DataTypes.DATE}
})

Category.hasMany(Item)
Item.belongsTo(Category)


//add trigger


// Category.hasOne(Category)
// Category.belongsTo(Category)

Item.hasMany(Review)
Review.belongsTo(Item)

module.exports =
    {
        Item,
        Category,
        Review
    }