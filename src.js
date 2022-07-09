// src.js

const Discord = require("discord.js")

function DiscordLogger(settings = {}) {
	if (!settings.url) error("NO_WEBHOOK_URL")
	this.name = settings.name || "logger"
	this.avatar = settings.avatar || undefined
	// this.name
	let url = parseUrl(settings.url)
	let style = settings.style || "default"

	let client = new Discord.WebhookClient({
		id: url.webhookId, 
		token: url.webhookToken
	})
	
	let prefixMap = new Map([
		["log", {text: "`[LOG]` ", icon: ":page_with_curl: "}],
		["info", {text: "`[INFO` ", icon: ":information_source: "}],
		["warn", {text: "`[WARN` ", icon: ":warning: "}],
		["error", {text: "`[ERROR` ", icon: ":bangbang: "}],
		["debug", {text: "`[DEBUG]` ", icon: ":bug: "}]
	])

	//! LOG //
	this.log = async (message, opts = {}) => {
		this.type = "log"
		this.message = message
		if (opts.name) this.name = opts.username
		let data = {content: format(), username: this.name, avatarURL: this.avatar}
		return await client.send(data)
	}

	//! INFO //
	this.info = async (message, opts = {}) => {
		this.type = "info"
		this.message = message
		if (opts.name) this.name = opts.name
		let data = {content: format(), username: this.name, avatarURL: this.avatar}
		return await client.send(data)
	}

	//! WARN //
	this.warn = async (message, opts = {}) => {
		this.type = "warn"
		this.message = message
		if (opts.name) this.name = opts.name
		let data = {content: format(), username: this.name, avatarURL: this.avatar}
		return await client.send(data)
	}

	//! ERROR //
	this.error = async (message, opts = {}) => {
		this.type = "error"
		this.message = message
		if (opts.name) this.name = opts.name
		let data = {content: format(), username: this.name, avatarURL: this.avatar}
		return await client.send(data)
	}

	//! DEBUG //
	this.debug = async (message, opts = {}) => {
		this.type = "debug"
		this.message = message
		if (opts.name) this.name = opts.name
		let data = {content: format(), username: this.name, avatarURL: this.avatar}
		return await client.send(data)
	}

	//! DELETE // delete a log
	this.delete = async function(message) {
		return await client.deleteMessage(message)
	}

	//! EDIT // edits a message
	this.edit = async function(message, string) {
		let match = message?.content?.match(/\[log\]|\[info\]|\[warn\]|\[error\]|\[debug\]/)
		if (match) match = match[0]
		else match == "log"
		match = match.replace(/\[|\]/gi, "")
		this.type = match
		this.message = string
		let newContent = format()
		return await client.editMessage(message, {content: newContent})
	}

	let format = () => {
		let p = ""
		// let n = ""
		p = this.type
		let output
		if (style == "default") output = `\`[${p}]\` \`${this.message}\``
		else if (style == "console") output = `\`\`\`txt\n[${p}] ${this.message}\`\`\``
		else if (style == "text") output = `[${p}] ${this.message}`
		return output
	}
}


// PARSE URL // parses the id and token from a url string
function parseUrl(url, debug) {

	let webhookId
	let webhookToken

	if (!url) error("NO_URL")

	if (!url.startsWith('https://discord.com/api/webhooks/')) {
		if (debug) console.debug(url)
		throw  error("INVALID_URL")
	} else {
		if (url.match(/(?!webhooks\/)\d.+?(?=\/)/g)) {
			if (debug)logger.debug(webhookId)
				webhookId = url.match(/(?!webhooks\/)\d.+?(?=\/)/g)[0]
		}
		if (url.match(/(?<=\d\/).+?$/g)) {
			if (debug)logger.debug(webhookToken)
				webhookToken = url.match(/(?<=\d\/).+?$/g)[0]
		}
	}
	return {
		webhookId,
		webhookToken
	}
}


// ERROR HANDLER //
function error(type) {

	let error
	let errors = new Map([
		["NO_WEBHOOK_URL", "please enter a valid webhook url"],
		["NO_URL", "no webhook url was provided"],
		["INVALID_URL", "check if this is a discord webhook URL"]
	])

	if (errors.has(type)) error = new Error(errors.get(type))
	else error = new Error("something went wrong")

	error.module = "discordLogger"
	error.code = type

	throw error
	
}

module.exports = DiscordLogger