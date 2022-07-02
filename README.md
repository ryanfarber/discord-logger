# discord-logger

![image](https://cdn.glitch.com/dc4b1449-e9df-4aaa-a6ef-c17b2496dea6%2F49180_3_640px.jpg?v=1604715451701)

log to a discord channel. uses dicord webhooks

### usage
think of this as a normal console logger, but sends the logs to a discord channel, using webhooks.


```javascript
const DiscordLogger = require("@ryanforever/discord-logger")
const logger = new DiscordLogger({
	name: "discordLogger", // name your logger, defaults to "logger"
	url: process.env.DISCORD_WEBHOOK_URL, // webhook url
})


logger.log("this is a log")
logger.info("this is info")
logger.warn("this is a warning")
logger.error("this is an error")
logger.debug("this is a debug")
```

### change name on the fly
```javascript
logger.name = "boosted"

logger.log("this log will have a new name")
// [log] this log will have a new name
````

```javascript
logger.log("change name via config", {name: "zoinks"})
// [log] change name via config
```
### change style
```javascript
const logger = new DiscordLogger({
	name: "discordLogger",
	url: process.env.DISCORD_WEBHOOK_URL,
	style: "console" // options are "text" "console" or "default"
})
```

### edit a log
pass in the returned log object to logger.edit to edit the log in place
```javascript
let log = await logger.log("original log")
logger.edit(log,"new log")
```

### delete a log
pass in the returned log object to logger.delete to delete the log
```javascript
let log = await logger.log("this log will go bye bye")
logger.delete(log)
```

## methods

`.log(message, opts)`

`.info(message, opts)`

`.warn(message, opts)`

`.error(message, opts)`

`.debug(message, opts)`