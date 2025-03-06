const Product = require("../../models/product.model");

// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const filterStatus = [
    {
      label: "Tất cả",
      value: ""
    },
    {
      label: "Hoạt động",
      value: "active"
    },
    {
      label: "Dừng hoạt động",
      value: "inactive"
    },
  ];

  console.log(req.query.status);

  if(req.query.status) {
    find.status = req.query.status;
  }

  // Tim kiem
  let keyword = "";
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
    keyword = req.query.keyword;
  }
  // Het tim kiem

  const products = await Product.find(find);
  // console.log(products);
    res.render("admin/pages/products/index", {
      pageTitle: "Quản lý sản phẩm",
      products: products,
      keyword: keyword,
      filterStatus: filterStatus
    });
  }