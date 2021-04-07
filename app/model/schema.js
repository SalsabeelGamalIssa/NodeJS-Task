const Sequelize = require("sequelize")
const db = require("../config/db")
const CategoryModel = require("./category")
const ProviderModel = require("./provider")
const ProductModel = require("./product")
var DataTypes = require('sequelize/lib/data-types');


const Category = CategoryModel(db, Sequelize)
const Provider = ProviderModel(db, Sequelize)
const Product = ProductModel(db, Sequelize)

const product_provider = db.define('product_provider', {
   
    price:Sequelize.DataTypes.DOUBLE,
    avaliable:Sequelize.DataTypes.BOOLEAN
})


Category.hasMany(Product)
Product.belongsTo(Category)

Category.hasMany(Category, {as: 'SubCatgory'}) 


Product.belongsToMany(Provider, { through: product_provider })
Provider.belongsToMany(Product, { through: product_provider })


db.sync({ force: false }).then(() => {
  console.log("Tables Created!")
})

module.exports = {
  Category,
  Product,
  Provider,
  
}