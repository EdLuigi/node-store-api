const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const search = "alb";

    const products = await Product.find({
        name: { $regex: search, $options: "i" },
    });
    res.status(200).json({ results: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    console.log(queryObject);
    const products = await Product.find(queryObject);
    // const products = await Product.find(req.query);
    res.status(200).json({ results: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
