import * as winston from "winston";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import chalk from "chalk";
import moment from "moment";
import { inspect } from "util";

enum LogLevel {
  CRITICAL = "critical",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  DEBUG = "debug",
  TRACE = "trace",
}

interface LogMetadata extends Record<string, unknown> {
  timestamp?: string;
  level?: LogLevel;
  service?: string;
  environment?: string;
}

interface LoggerConfig {
  debug?: boolean;
  logDir?: string;
  datePattern?: string;
}

const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    critical: "red",
    error: "red",
    warning: "yellow",
    info: "green",
    debug: "blue",
    trace: "gray",
  },
};

class LoggerService {
  private static _instance: LoggerService;
  private _logger: winston.Logger;
  private _serviceName: string;
  private _environment: string;
  private _config: LoggerConfig;

  private constructor(
    serviceName: string = "DefaultService",
    environment: string = process.env.NODE_ENV || "development",
    config: LoggerConfig = {}
  ) {
    this._serviceName = serviceName;
    this._environment = environment;
    this._config = {
      debug: environment !== "production",
      logDir: path.join(process.cwd(), "logs"),
      datePattern: "YYYY-MM-DD",
      ...config,
    };
    this._logger = this._configureLogger();
  }

  public static getInstance(
    serviceName: string = "DefaultService",
    environment: string = process.env.NODE_ENV || "development",
    config: LoggerConfig = {}
  ): LoggerService {
    if (!this._instance) {
      this._instance = new LoggerService(serviceName, environment, config);
    }
    return this._instance;
  }

  private _configureLogger(): winston.Logger {
    const logDir = path.join(
      this._config.logDir!,
      this._serviceName,
      this._environment
    );
    fs.mkdirSync(logDir, { recursive: true });

    winston.addColors(customLevels.colors);

    const customFormat = winston.format.printf(
      (info: winston.Logform.TransformableInfo) => {
        const { level, message, metadata } = info;
        const timestamp = moment().format("DD.MM.YYYY HH:mm:ss:SSS");
        
        const colorMap: Record<string, typeof chalk.red> = {
          critical: chalk.bold.red,
          error: chalk.red,
          warning: chalk.yellow,
          info: chalk.green,
          debug: chalk.blue,
          trace: chalk.gray,
        };
        
        const colorFunc = colorMap[level] || chalk.white;
        
        const metadataStr = metadata
          ? Object.entries(metadata as LogMetadata)
              .filter(
                ([key]) =>
                  ![
                    "service",
                    "environment",
                    "hostname",
                    "timestamp",
                  ].includes(key)
              )
              .map(
                ([key, value]) =>
                  `${chalk.cyan(key)}: ${inspect(value, { depth: 2 })}`
              )
              .join("\n")
          : "";
        
        return colorFunc(
          [
            `[${timestamp}]`,
            `[${level.toUpperCase()}]`,
            String(message),
            // metadataStr ? `\n${metadataStr}` : ""
          ].filter(Boolean).join(" ")
        );
      }
    );

    const transports: winston.transport[] = [];

    if (this._config.debug) {
      transports.push(
        new winston.transports.Console({
          level: "trace",
          format: customFormat,
        })
      );
    }

    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, `${this._config.datePattern}-combined.log`),
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        maxsize: 5242880,
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: path.join(logDir, `${this._config.datePattern}-error.log`),
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        maxsize: 5242880,
        maxFiles: 5,
      })
    );

    return winston.createLogger({
      level: this._config.debug ? "trace" : "info",
      levels: customLevels.levels,
      format: winston.format.combine(
        winston.format.metadata({
          fillExcept: ["message", "level", "timestamp"],
        })
      ),
      defaultMeta: {
        service: this._serviceName,
        environment: this._environment,
        hostname: os.hostname(),
      },
      transports,
    });
  }

  private _log(
    level: LogLevel,
    message: string,
    metadata: LogMetadata = {}
  ): void {
    const enrichedMetadata: LogMetadata = {
      ...metadata,
      timestamp: moment().toISOString(),
      service: this._serviceName,
    };
    
    this._logger.log({
      level,
      message,
      metadata: enrichedMetadata,
    });
  }

  public trace(message: string, metadata: LogMetadata = {}): void {
    this._log(LogLevel.TRACE, message, metadata);
  }

  public debug(message: string, metadata: LogMetadata = {}): void {
    this._log(LogLevel.DEBUG, message, metadata);
  }

  public info(message: string, metadata: LogMetadata = {}): void {
    this._log(LogLevel.INFO, message, metadata);
  }

  public warning(message: string, metadata: LogMetadata = {}): void {
    this._log(LogLevel.WARNING, message, metadata);
  }

  public error(
    message: string,
    error?: Error,
    metadata: LogMetadata = {}
  ): void {
    const errorMetadata = error
      ? {
          ...metadata,
          error_name: error.name,
          error_message: error.message,
          error_stack: error.stack,
        }
      : metadata;
    this._log(LogLevel.ERROR, message, errorMetadata);
  }

  public critical(
    message: string,
    error?: Error,
    metadata: LogMetadata = {}
  ): void {
    const criticalMetadata = error
      ? {
          ...metadata,
          error_name: error.name,
          error_message: error.message,
          error_stack: error.stack,
        }
      : metadata;
    this._log(LogLevel.CRITICAL, message, criticalMetadata);
  }

  public measure<T>(operationName: string, operation: () => T): T {
    const startTime = Date.now();
    try {
      const result = operation();
      const duration = Date.now() - startTime;
      this.info(`Performance Measurement: ${operationName}`, {
        duration_ms: duration,
        operation: operationName,
      });
      return result;
    } catch (error) {
      this.error(
        `Performance Measurement Error: ${operationName}`,
        error as Error
      );
      throw error;
    }
  }

  public async measureAsync<T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      this.info(`Async Performance Measurement: ${operationName}`, {
        duration_ms: duration,
        operation: operationName,
      });
      return result;
    } catch (error) {
      this.error(
        `Async Performance Measurement Error: ${operationName}`,
        error as Error
      );
      throw error;
    }
  }

  public logSystemResources(): void {
    const cpuInfo = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    
    const resourceData = {
      system: {
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
      },
      cpu: {
        cores: cpuInfo.length,
        model: cpuInfo[0].model,
      },
      memory: {
        total_gb: Math.round(totalMemory / (1024 * 1024 * 1024)),
        free_gb: Math.round(freeMemory / (1024 * 1024 * 1024)),
        used_gb: Math.round((totalMemory - freeMemory) / (1024 * 1024 * 1024)),
        usage_percentage: Math.round(((totalMemory - freeMemory) / totalMemory) * 100),
      },
    };
    
    this.info("System Resource Overview", resourceData);
  }
}

export default LoggerService;