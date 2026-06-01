import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3, // Morgan will stream to this level
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development' ? 'debug' : 'info';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

// Console format
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// File format 
const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // JSON makes it easy for machines to read logs
);

const transports = [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }),
    new winston.transports.File({ filename: 'logs/all.log', format: fileFormat }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});

export default logger;