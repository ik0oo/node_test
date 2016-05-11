export const get = (req, res, next) => {
    if (req.url !== '/') next();
    else {
        res.render('index', {});
    }
};