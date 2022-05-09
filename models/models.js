const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Item = sequelize.define('item', {
    it_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    it_name: {type: DataTypes.STRING, allowNull: false},
    it_description: {type: DataTypes.STRING(512)},
    it_price: {type: DataTypes.INTEGER, allowNull: false},
    it_img: {type: DataTypes.STRING},
    it_date_add: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW,
    },
    it_owner: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    ca_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ca_name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Review = sequelize.define('review', {
    re_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    re_content: {type: DataTypes.STRING(512)},
    re_mark: {type: DataTypes.INTEGER, default_value: 0.0, validate: {min: 0.0, max: 5}},
    re_writer: {type: DataTypes.INTEGER},
    re_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
})

Category.hasMany(Item)
Item.belongsTo(Category)


//add trigger


// Category.hasOne(Category)
// Category.belongsTo(Category)

Item.hasMany(Review)
Review.belongsTo(Item, {onDelete: 'CASCADE'})

module.exports =
    {
        Item,
        Category,
        Review
    }