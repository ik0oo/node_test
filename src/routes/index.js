import * as frontpage from './frontpage';
import * as about from './about';
import * as chat from './chat';

export default function (app) {

    app
        .get('/', frontpage.get)
        .get('/about', about.get)
        .get('/chat', chat.get);


    //app.use(function (req, res) {
    //    res
    //        .status(404)
    //        .send('Page Not Found!!!');
    //});
};



