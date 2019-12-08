var db = require("../models");

module.exports = function (app) {

    // index page 
    app.get('/', (req, res) => {
        let userName;
        if (typeof (req.user) != "undefined") {

            userName = req.user.userName;

            db.Article.findAll({
                where: {
                    author: userName
                }
            }).then((blogDB) => {
                articles = blogDB.map(blogDB => blogDB.dataValues);
                console.log(req.user);
                res.render('pages/index', { userName, id: 0, articles: articles });
            });
        } else {

            userName = null;

            db.Article.findAll({}).then((blogDB) => {
                articles = blogDB.map(blogDB => blogDB.dataValues);
                console.log(req.user);
                res.render('pages/index', { userName, id: 0, articles: articles });
            });
        }
    });

    // about page 
    app.get('/write', (req, res) => { res.render('pages/write', { userName, edit: false, id: 0, articles: {} }) });

    // about page 
    app.get('/write/:id', function (req, res) {

        db.Article.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (blogDB) {
            console.log(blogDB[0].dataValues);
            (typeof (req.user) != "undefined") ? userName = req.user.userName : userName = null;
            res.render('pages/write', { userName, edit: true, id: req.params.id, articles: blogDB[0].dataValues });
        });
    });

    // about page 
    app.get('/article/:id', function (req, res) {

        console.log(req.params.id);

        db.Article.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (blogDB) {
            console.log(blogDB[0]);
            (typeof (req.user) != "undefined") ? userName = req.user.userName : userName = null;
            res.render('pages/article', { userName, id: req.params.id, articles: blogDB[0] });
        });
    });

    // about page 
    app.put('/article/:id', function (req, res) {

        console.log(req.params.id);

        db.Article.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (blogDB) {
            console.log(blogDB[0].dataValues);
            (typeof (req.user) != "undefined") ? userName = req.user.userName : userName = null;
            res.render('pages/article', { userName, id: req.params.id, articles: blogDB[0].dataValues });

        });
    });

    // about page 
    app.get('/featured', (req, res) => res.render('pages/featured') );

    // Render 404 page for any unmatched routes
    app.get("*",  (req, res) =>  res.render("pages/404"));

};