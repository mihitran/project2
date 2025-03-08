const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

// [GET] /admin/products-category
module.exports.index = (req, res) => {
  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm"
  });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  });
  console.log(records);
  res.render("admin/pages/products-category/create", {
    pageTitle: "Danh mục sản phẩm",
    records: records
  });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countCagegory = await ProductCategory.countDocuments({});
    req.body.position = countCagegory + 1;
  }
  
  const newCategory = new ProductCategory(req.body);
  await newCategory.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}