// test.js

require('dotenv').config();

const Logger = require("./index.js")
const logger = new Logger({
	name: "discordLogger",
	url: process.env.URL,
	icons: false
})

logger.debug("suous")
