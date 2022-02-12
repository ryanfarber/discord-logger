// test.js

require('dotenv').config();

const Logger = require("./index.js")
const logger = new Logger({
	name: "discordLogger",
	url: process.env.URL,
	icons: false
})

logger.log("discord-logger", {name: "test-logger"})
