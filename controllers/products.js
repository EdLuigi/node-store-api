const getAllProductsStatic = async (req, res) => {
    throw Error("testing error");
    res.status(200).json({ msg: "products testing route" });
};

const getAllProducts = (req, res) => {
    res.status(200).json({ msg: "products route" });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};
