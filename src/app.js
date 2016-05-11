import express from 'express';
import http from 'http';
import path from 'path';
import jade from 'jade';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import config from '../config/index';
import routes from './routes/index';
import log from './logs/index';

const app = express();

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connection.on('error', (err) => {
    log.info(err);
    console.log(err);
});
mongoose.connection.on('open', () => {
    log.info('Data base has connected');
    console.log('Data base has connected');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', config.get('port'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json()); // req.body
app.use(bodyParser.urlencoded({extended: true})); // req.body

app.use(cookieParser()); // req.cookies

const sessionConfig = config.get('session');
const mongoStore = MongoStore(session);
sessionConfig.store = new mongoStore({mongooseConnection: mongoose.connection});
app.use(session(sessionConfig));

//app.use((req, res, next) => {
//
//});

app.use(express.Router());

routes(app);

app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));


app.use((error, req, res, next) => {
    if (app.get('env') == 'development') {
        res.send(error);
    } else {
        res
            .status(500)
            .send('Something failed >_<');
    }
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
    log.info('Express server listening on port ' + app.get('port'));
});
