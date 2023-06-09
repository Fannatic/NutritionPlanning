const { Router } = require('express');
const app = Router();
const db = require('../dataAccess/sqlite');

const ingridient = require('../controllers/ingredientcontroller')

app.get("/Ingredients", (req, res, next) => {
    var sql = "select * from Ingredients"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json([
            ...rows
        ])
      });
});

app.post("/Ingredients/", (req, res, next) => {
    // var errors=[]
    // if (!req.body.name){
    //     errors.push("No name provided");
    // }
    // if (!req.body.protein){
    //     errors.push("No protein value provided");
    // }
    // if (errors.length){
    //     res.status(400).json({"error":errors.join(",")});
    //     return;
    // }
    var data = {
        name: req.body.name,
        protein: req.body.protein,
        fat : req.body.fat,
        kcal : req.body.kcal,
        carbs : req.body.carbs,
        unitId : req.body.unitId,
    }
    var sql ='INSERT INTO Ingredients (name, protein, fat, kcal, carbs, unitId) VALUES (?,?,?,?,?,?)'
    var params =[data.name, data.protein, data.fat, data.carbs, data.kcal, data.unitId]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err})
            return;
        }
        res.json({
            "message": "success",
            "data": data,    
        })
    });
})


app.put("/Ingredients/:id", (req, res, next) => {
    var data = {
        id: req.body.id,
        name: req.body.name,
        protein: req.body.protein,
        fat : req.body.fat,
        kcal : req.body.kcal,
        carbs : req.body.carbs,
        unitId : req.body.unitId
    }
    var sql  = 'UPDATE Ingredients SET name = ?, protein = ?, fat = ?, kcal = ?, carbs = ?, unitId = ? WHERE id = ?';
    var params =[data.name, data.protein, data.fat, data.kcal, data.carbs, data.unitId, data.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err})
            return;
        }
        res.json({
            "message": "success",
            "data": data,    
        })
    });
})

app.delete("/Ingredients/:id", (req, res, next) => {

    var param = req.params.id

    db.serialize(function () {

        db.run("BEGIN");

        db.run(`delete from Ingredients where id = ${param}`, function (err, row) {
            if (err) {
                console.log(err);
                res.end("Transaction cancelled");
            }
            else {
                db.run(`delete from IngredientsInRecipesXrefs where ingridientId = ${param}`, function (err, row) {
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

module.exports = app;