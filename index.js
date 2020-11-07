// index.js

const Discord = require("discord.js");

function DiscordLogger(hookName, hookUrl) {
	var url = parseUrl(hookUrl)
	const hook = new Discord.WebhookClient(url.webhookId, url.webhookToken);
	var config = {
		username: hookName || "logger"
	}

	this.log = function(message) {
		// let hook = new Hook(hookName, hookUrl)
		hook.send(":page_with_curl: " + message, config)
	}

	this.info = function(message) {
		// let hook = new Hook(hookName, hookUrl)
		hook.send(":information_source: " + message, config)
	}

	this.warn = function(message) {
		// let hook = new Hook(hookName, hookUrl)
		hook.send(":warning: " + message, config)
	}

	this.error = function(message) {
		// let hook = new Hook(hookName, hookUrl)
		hook.send(":bangbang: " + message, config)
	}

}

function parseUrl(url, debug) {
	// parses the id and token from a url string

	var webhookId;
	var webhookToken;

	if (!url) throw "no url provided"

	if (!url.startsWith('https://discord.com/api/webhooks/')) {
		if (debug) logger.debug(url)
		throw new Error('check if this is a discord webhook URL');
	} else {
		if (url.match(/(?!webhooks\/)\d.+?(?=\/)/g)) {
			if (debug)logger.debug(webhookId)
				webhookId = url.match(/(?!webhooks\/)\d.+?(?=\/)/g)[0];
		};
		if (url.match(/(?<=\d\/).+?$/g)) {
			if (debug)logger.debug(webhookToken)
				webhookToken = url.match(/(?<=\d\/).+?$/g)[0];
		}; 
	};

	return {
		webhookId,
		webhookToken
	}
}

module.exports = DiscordLogger