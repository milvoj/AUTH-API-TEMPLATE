import winston, {createLogger, transports} from "winston";

const prettyJson = winston.format.printf(info => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4)
    }
    return `${info.timestamp} ${info.label || '-'} ${info.level}: ${info.message}`
})

const logger = createLogger({
    transports: [
        new transports.File({ filename: './log/combined.log' }),
        new transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        prettyJson
    ),
});

export default logger;