// index.js

const Discord = require("discord.js"); 

function DiscordLogger(settings = {}) {
	if (!settings.url) return console.error("please enter a webhook url for this logger")
	let hookName = settings.name || "logger"
	let url = parseUrl(settings.url);
	let avatar = settings.avatar || ""
	let icons = settings.icons || false

	let client = new Discord.WebhookClient(url.webhookId, url.webhookToken);
	var config = {
		username: hookName,
		avatarURL: avatar
	};

	let prefixMap = new Map([
		["log", {text: "[LOG] ", icon: ":page_with_curl: "}],
		["info", {text: "[INFO] ", icon: ":information_source: "}],
		["warn", {text: "[WARN] ", icon: ":warning: "}],
		["error", {text: "[ERROR] ", icon: ":bangbang: "}],
		["debug", {text: "[DEBUG] ", icon: ":bug: "}]
	]);

	this.log = (message, opts = {}) => {
		let prefix = (icons) ? prefixMap.get("log").icon : prefixMap.get("log").text;
		if (opts.name) config.username = opts.name;
		client.send(prefix + message, config);
	};
	this.info = (message, opts = {}) => {
		let prefix = (icons) ? prefixMap.get("info").icon : prefixMap.get("info").text;
		if (opts.name) config.username = opts.name;
		client.send(prefix + message, config);
	};
	this.warn = (message, opts = {}) => {
		let prefix = (icons) ? prefixMap.get("warn").icon : prefixMap.get("warn").text;
		if (opts.name) config.username = opts.name;
		client.send(prefix + message, config);
	};
	this.error = (message, opts = {}) => {
		let prefix = (icons) ? prefixMap.get("error").icon : prefixMap.get("error").text;
		if (opts.name) config.username = opts.name;
		client.send(prefix + message, config);
	};
	this.debug = (message, opts = {}) => {
		let prefix = (icons) ? prefixMap.get("debug").icon : prefixMap.get("debug").text;
		if (opts.name) config.username = opts.name;
		client.send(prefix + message, config);
	};

};

function parseUrl(url, debug) {
	// parses the id and token from a url string

	var webhookId;
	var webhookToken;

	if (!url) throw "no url provided";

	if (!url.startsWith('https://discord.com/api/webhooks/')) {
		if (debug) console.debug(url);
		throw new Error('check if this is a discord webhook URL');
	} else {
		if (url.match(/(?!webhooks\/)\d.+?(?=\/)/g)) {
			if (debug)logger.debug(webhookId);
				webhookId = url.match(/(?!webhooks\/)\d.+?(?=\/)/g)[0];
		};
		if (url.match(/(?<=\d\/).+?$/g)) {
			if (debug)logger.debug(webhookToken);
				webhookToken = url.match(/(?<=\d\/).+?$/g)[0];
		}; 
	};

	return {
		webhookId,
		webhookToken
	}
}

module.exports = DiscordLogger