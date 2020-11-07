# rf-discord-logger
 a utility to send logs to a discord channel using webhooks


 ```javascript
 
const Logger = require("rf-discord-logger")
const logger = new Logger("logger name", "hook url")

logger.log("hey")
logger.info("hey")
logger.warn("hey")
logger.error("hey")


 ```
