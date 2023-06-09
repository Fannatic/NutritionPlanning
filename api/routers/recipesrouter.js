const { Router } = require('express');
const app = Router();
const db = require('../dataAccess/sqlite');

const recipes = require('../controllers/recipescontroller')

app.get("/Recipes", (req, res, next) => {
    var sql = "select * from Recipes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json([
            ...rows
        ])
    });
});

app.put("/Recipes", (req, res, next) => {
    var data = {
        id: req.body.id,
        name: req.body.name,
        proteins: req.body.proteins,
        fats: req.body.fats,
        kcal: req.body.kcal,
        carbs: req.body.carbs,
        steps: req.body.steps
    }

    var sql = 'UPDATE Recipes SET name = ?, proteins = ?, fats = ?, carbs = ?, kcal = ?, steps = ? WHERE id = ?';
    var params = [data.name, data.proteins, data.fats, data.carbs, data.kcal, data.steps, data.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/Recipes/", (req, res, next) => {
    var data = {
        name: req.body.name,
        steps: req.body.steps
    }
    var sql = 'INSERT INTO Recipes (name, steps) VALUES (?,?)';
    var params = [data.name, data.steps]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

app.delete("/Recipes/:id", (req, res, next) => {

    var param = req.params.id

    db.serialize(function () {

        db.run("BEGIN");

        db.run(`delete from Recipes where id = ${param}`, function (err, row) {
            if (err) {
                console.log(err);
                res.end("Transaction cancelled");
            }
            else {
                db.run(`delete from IngredientsInRecipesXrefs where recipeId = ${param}`, function (err, row) {
                    if (err) {
                        console.log(err);
                        db.rollback;
                        res.end("Transaction cancelled");
                    }
                    else {
                        db.run('commit');
                        res.end("Transaction succeed");
                    }
                });

            }

        });
    });

})

app.get("/Recipes/Ingredients", (req, res, next) => {
    var sql = "select * from IngredientsInRecipesXrefs"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json([
            ...rows
        ])
    });
});

app.post("/Recipes/Ingredients", (req, res, next) => {
    var data = {
        recipeId: req.body.recipeId,
        ingredientId: req.body.ingredientId
    }
    var sql = 'INSERT INTO IngredientsInRecipesXrefs (recipeId, ingredientId) VALUES (?,?)'
    var params = [data.recipeId, data.ingredientId]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

app.get("/IngredientsInRecipes/:recipeId", (req, res, next) => {
    var sql = "select * from IngredientsInRecipesXrefs where recipeId = ?"
    var params = [req.params.recipeId]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json([
            ...rows
        ])
    });
});

app.delete("/Recipes/Ingredients/:id", (req, res, next) => {
    var sql = "delete from IngredientsInRecipesXrefs where id = ?"
    var params = [req.params.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err })
            return;
        }
        res.json({
            "message": "success"
        })
    });
})

module.exports = app;