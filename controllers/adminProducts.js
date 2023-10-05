const { faker } = require("@faker-js/faker");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { deleteFile } = require("../utils/file");
const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("categoryId", "_id name cateImage");
    res.status(200).json({
      message: "Fetch all products successfully!",
      products,
    });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch products!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    res.status(200).json({
      message: "Fetch single product successfully!",
      product,
    });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch products!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

exports.createRandomProducts = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const randNumber = Math.trunc(Math.random() * 3);
    const randNumberDiscount = Math.trunc(Math.random() * 10);

    let result = [];

    for (let i = 0; i < 10; i++) {
      const productData = {
        name: faker.commerce.productName(),
        oldPrice: faker.commerce.price({ min: 100, max: 200 }),
        discount: randNumberDiscount,
        images: new Array(5)
          .fill(faker.image.urlLoremFlickr({ width: 358, height: 358, category: "technology" }))
          .join(","),
        shortDesc: faker.commerce.productDescription(),
        fullDesc: faker.commerce.productDescription(),
        stockQty: 100,
        categoryId: categories.map((cate) => cate._id)[randNumber],
        thumbnail: faker.image.urlLoremFlickr({ width: 358, height: 358, category: "technology" }),
        views: 100,
      };

      const newProduct = new Product(productData);

      await newProduct.save();

      result.push(productData);
    }

    res.status(200).json({
      message: "Get random products success !!!",
      result,
    });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to create random products!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

exports.postProduct = async (req, res, next) => {
  const { name, oldPrice, discount, shortDesc, fullDesc, stockQty, categoryId, images, thumbnail } =
    req.body;

  // const images = req.files.map((item) => item.path.replace("\\", "/"));

  const thumb = thumbnail;
  try {
    const product = new Product({
      name,
      oldPrice,
      discount,
      images: images,
      thumbnail: thumb,
      shortDesc,
      fullDesc,
      stockQty,
      categoryId,
    });

    const productResponse = await product.save();

    const category = await Category.findById(categoryId);

    const result = {
      ...productResponse._doc,
      categoryId: {
        _id: productResponse.categoryId._id,
        name: category.name,
        cateImage: category.cateImage,
      },
    };

    res.json({
      message: "Create product successfully!",
      product: result,
    });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch products!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const {
    name,
    oldPrice,
    discount,
    oldImages,
    shortDesc,
    fullDesc,
    stockQty,
    categoryId,
    thumbnail,
    images,
  } = req.body;

  const { productId } = req.params;

  try {
    // Find product by id
    const product = await Product.findById(productId);

    // Update product follow by that id
    product.name = name;
    product.oldPrice = +oldPrice;
    product.discount = +discount;

    // Trường hợp không up ảnh nào thì sao ???

    const category = await Category.findById(categoryId);

    product.images = images;
    product.thumbnail = thumbnail;
    product.shortDesc = shortDesc;
    product.fullDesc = fullDesc;
    product.stockQty = +stockQty;
    product.categoryId = categoryId;

    const productResponse = await product.save();

    const result = {
      ...productResponse._doc,
      categoryId: {
        _id: productResponse.categoryId._id,
        name: category.name,
        cateImage: category.cateImage,
      },
    };

    res.json({
      message: "Update product successfully!",
      product: result,
    });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to fetch products!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const { images } = await Product.findById(productId);
    const response = await Product.deleteOne({
      _id: productId,
    });

    res.json({
      message: "Delete product successfully!",
      productId: productId,
      result: response,
    });

    // Loop and Delete product images from images folder source
    // images?.split(", ").forEach((image) => {
    //   deleteFile(image);
    //   console.log("deleted: ", image);
    // });
  } catch (error) {
    if (!error) {
      const error = new Error("Failed to delete product!");
      error.statusCode(422);
      return error;
    }
    next(error);
  }
};
