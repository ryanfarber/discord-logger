# rf-discord-logger

![image](https://cdn.glitch.com/dc4b1449-e9df-4aaa-a6ef-c17b2496dea6%2F49180_3_640px.jpg?v=1604715451701)

a utility to send logs to a discord channel using webhooks

### usage
think of this as a normal console logger, but sends the logs to a discord channel, using webhooks.


```javascript

const DiscordLogger = require("rf-discord-logger")
const logger = new DiscordLogger({
	name: "discordLogger", // name your logger, defaults to "logger"
	url: process.env.URL, // webhook url
	icons: false // show icons instead of [LOG], [WARN], etc.
})


logger.log("this is a log")
// [LOG] this is a log
logger.log("this is a log", {name: "newLoggerName"}) // changes the username of the bot on the fly
logger.info("this is info")
logger.warn("this is a warning")
logger.error("this is an error")
logger.debug("this is a debug")

```


## methods

`.log(message, opts)`

`.info(message, opts)`

`.warn(message, opts)`

`.error(message, opts)`

`.debug(message, opts)`