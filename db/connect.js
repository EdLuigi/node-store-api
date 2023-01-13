const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // adicionado só para diminuir os warnings no terminal

const connectDB = (url) => {
    return mongoose.connect(url);
};

module.exports = connectDB;
