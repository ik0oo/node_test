export const get = (req, res, next) => {

    let active = req.url.slice(1);

    res.render('chat', {
        title: 'Hey',
        message: 'hello there',
        active: active
    });
};