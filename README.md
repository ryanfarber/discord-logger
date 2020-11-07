# rf-discord-logger

![image](https://cdn.glitch.com/dc4b1449-e9df-4aaa-a6ef-c17b2496dea6%2F49180_3_640px.jpg?v=1604715451701)

a utility to send logs to a discord channel using webhooks

### usage
think of this as a normal console logger, but sends the logs to a discord channel, using webhooks.


```javascript

const Logger = require("rf-discord-logger")
const logger = new Logger("logger name", "hook url")

logger.log("this is a log")
logger.info("this is info")
logger.warn("this is a warning")
logger.error("this is an error")


```
