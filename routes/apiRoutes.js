var db = require("../models");

module.exports = (app) => {

    // Get all articles
    app.get("/api/articles", (req, res) => db.Article.findAll({}).then((blogDB) => res.json(blogDB)));

    // Delete article based on ID
    app.delete("/api/article/:id", (req, res) => db.Article.destroy({ where: { id: req.params.id } }).then((dbExample) => res.json(dbExample)));

    // Add likes to total 
    app.post("/api/likes/:id", (req, res) => db.Article.findall({}).then((blogDB) => res.json(blogDB)));

    // Add comment 
    app.post("/api/comments/:id", (req, res) => {
        db.Article.findAll({
            where: {
                id: req.params.id
            }
        }).then((blogDB) => {
            db.Article.update({
                comments: blogDB[0].dataValues.comments.push(req.body.comment)
            }, {
                where: {
                    id: req.params.id
                }
            }).then((blogDB) => res.json(blogDB));
        });
    });

    app.post("/api/articles", (req, res) => {

        db.Article.create({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        }).then((blogDB) => res.json(blogDB));
    })

    app.put("/api/articles/:id", (req, res) => {

        db.Article.update({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        }, {
            where: {
                id: req.params.id
            }
        }).then((blogDB) => res.json(blogDB));
    })
};

