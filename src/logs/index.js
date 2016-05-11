import  winston from 'winston';
var ENV = process.env.NODE_ENV;

export default (function (module) {
    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV == 'development' ? 'debug' : 'error',
                label: path
            }),
            new winston.transports.File({
                filename: __dirname + '/debug.log',
                level: 'debug',
                label: path
            })
        ]
    });
})(module);
