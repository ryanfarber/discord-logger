// index.js

const Discord = require("discord.js"); 

function DiscordLogger(hookName, hookUrl, icons) {
	var url = parseUrl(hookUrl);
	const hook = new Discord.WebhookClient(url.webhookId, url.webhookToken);
	var config = {
		username: hookName || "logger"
	};

	let prefixMap = new Map([
		["log", {text: "[LOG] ", icon: ":page_with_curl: "}],
		["info", {text: "[INFO] ", icon: ":information_source: "}],
		["warn", {text: "[WARN] ", icon: ":warning: "}],
		["error", {text: "[ERROR] ", icon: ":bangbang: "}],
		["debug", {text: "[DEBUG] ", icon: ":bug: "}]
	]);

	this.log = (message) => {
		let prefix = (icons) ? prefixMap.get("log").icon : prefixMap.get("log").text;
		hook.send(prefix + message, config);
	};
	this.info = (message) => {
		let prefix = (icons) ? prefixMap.get("info").icon : prefixMap.get("info").text;
		hook.send(prefix + message, config);
	};
	this.warn = (message) => {
		let prefix = (icons) ? prefixMap.get("warn").icon : prefixMap.get("warn").text;
		hook.send(prefix + message, config);
	};
	this.error = (message) => {
		let prefix = (icons) ? prefixMap.get("error").icon : prefixMap.get("error").text;
		hook.send(prefix + message, config);
	};
	this.debug = (message) => {
		let prefix = (icons) ? prefixMap.get("debug").icon : prefixMap.get("debug").text;
		hook.send(prefix + message, config);
	};

};

function parseUrl(url, debug) {
	// parses the id and token from a url string

	var webhookId;
	var webhookToken;

	if (!url) throw "no url provided";

	if (!url.startsWith('https://discord.com/api/webhooks/')) {
		if (debug) logger.debug(url);
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