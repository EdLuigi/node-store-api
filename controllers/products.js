const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).select("name price");
    res.status(200).json({ results: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
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

    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.replaceAll(",", " ");
        result = result.sort(sortList);
    } else {
        result = result.sort();
    }

    if (fields) {
        const fieldsList = fields.replaceAll(",", " ");
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ results: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
