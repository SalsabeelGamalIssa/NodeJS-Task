const {
  Category,
  Product,
  Provider,
  product_provider,
} = require("../model/schema");
const sequelize = require("sequelize");
const provider = require("../model/provider");

module.exports.get_Allproducts = (req, res) => {
  let limit = 25;
  let offset = 0;
  Product.findAndCountAll()
    .then((data) => {
      let page = req.params.page || 1;
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Product.findAll({
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
      }).then((products) => {
        res
          .status(200)
          .json({ result: products, count: data.count, pages: pages });
      });
    })
    .catch(function (error) {
      res.status(500).send("Internal Server Error");
    });
};

module.exports.get_CategoryProducts = (req, res) => {
  let limito = parseInt(req.params.limit) || 25;
  console.log("looooooool " + limito);
  Category.findAll({
    where: { id: req.params.categoryId },
    include: [Product],
  }).then((result) => {
    //   console.log(result);
    //   const resProducts=result[0].products;
    //   console.log("heheheeheh "+JSON.stringify(result[0].products));
    //  res.json(result)

    const resProducts = result[0].products;

    // console.log(resProducts);
    const ProductsIds = resProducts.map((product) => product.id);
    //console.log("ids "+ ProductsIds);
    Product.findAndCountAll({
      limit: limito,
      offset: 0,
      where: {
        id: ProductsIds,
      },
      include: [{ model: Provider, through: { where: { avaliable: true }} }],
      // attributes: [[sequelize.fn('min', sequelize.col('providers.price')), 'minPrice']],
    }).then((result) => {
      res.json(result);
    });
  });
};

module.exports.toggleAvailable = (req, res) => {


  let id = parseInt(req.params.productId) ;


    Product.findAll({
      where: {
        id: id,
      },
      include: [{ model: Provider, through: { where: { productId: id }} }],
      // attributes: [[sequelize.fn('min', sequelize.col('providers.price')), 'minPrice']],
    }).then((result) => {
      console.log(result[0].providers[0].product_provider.avaliable);
      result[0].providers.map(provider=>{
        provider.product_provider.avaliable=!provider.product_provider.avaliable;
      })
      console.log(result[0].providers[0].product_provider.avaliable);
     // result.save();

      res.json(result);
    });
  
};





