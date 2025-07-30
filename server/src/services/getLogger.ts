import config from "../../config";
import LoggerService from "../utils/logger";

const logger = LoggerService.getInstance(
  "ThinkNote",
  process.env.NODE_ENV || "development",
  {
    debug: config.debug,
    datePattern: "server",
  }
);

export default logger;
