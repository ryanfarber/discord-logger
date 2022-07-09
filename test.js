// test.js

require('dotenv').config()

const Logger = require("./index.js")
const logger = new Logger({
	name: "test-logger",
	url: process.env.DISCORD_WEBHOOK_URL
	// style: "text"
})

// test()
// selfDesctruct(2)
// logger.name = "zooper"
logger.error("test")
// 
async function selfDesctruct(time) {
	console.log("self destructing log message...")
	let wait = time || 5
	let data = await logger.log(`this message will self destruct in ${wait} seconds`)
	let i = wait
	let interval = setInterval(async () => {
		i --
		if (i == 0) {
			await logger.edit(data, `💥`)
			clearInterval(interval)
		} else {
			await logger.edit(data, `this message will self destruct in ${i} seconds`)
		}
	}, 1000)
	return
}

async function test() {
	console.log("testing discord-logger")
	let types = ["log", "info", "warn", "error", "debug"]
	let messages = []
	for (let type of types) {
		console.log(`testing logger.${type}()`)
		await logger[type](`this is a test of a ${type} log`).then(res => {
			messages.push(res)
		})
	}
	console.log("deleting test logs...")
	messages.forEach(message => {
		logger.delete(message)
	})
}


