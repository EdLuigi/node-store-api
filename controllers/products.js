const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort("-name -price");
    res.status(200).json({ results: products.length, products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;
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

    // console.log(queryObject);
    let result = Product.find(queryObject);
    if (sort) {
        console.log(`sort: ${sort}`);
        const sortList = sort.replace(",", " ");
        result = result.sort(sortList);
    } else {
        result = result.sort();
    }
    const products = await result;
    // const products = await Product.find(req.query);
    res.status(200).json({ results: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
