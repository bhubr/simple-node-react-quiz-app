const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5000;

module.exports = { port };
