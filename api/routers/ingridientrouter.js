const { Router } = require('express');
const app = Router();
const db = require('../dataAccess/sqlite');

const ingridient = require('../controllers/ingridientcontroller')

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/Ingridients", (req, res, next) => {
    var sql = "select * from Ingridients"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/Ingridients/", (req, res, next) => {
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
        amount: req.body.amount
    }
    var sql ='INSERT INTO Ingridients (name, protein, fat, kcal, carbs, unitId, amount) VALUES (?,?,?,?,?,?,?)'
    var params =[data.name, data.protein, data.fat, data.carbs, data.kcal, data.unitId, data.amount]
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


app.put("/Ingridients/:id", (req, res, next) => {
    var data = {
        id: req.body.id,
        name: req.body.name,
        protein: req.body.protein,
        fat : req.body.fat,
        kcal : req.body.kcal,
        carbs : req.body.carbs,
        unitId : req.body.unitId,
        amount: req.body.amount
    }
    var sql  = 'UPDATE Ingridients SET name = ?, protein = ?, fat = ?, kcal = ?, carbs = ?, unitId = ?, amount = ? WHERE id = ?';
    var params =[data.name, data.protein, data.fat, data.kcal, data.carbs, data.unitId, data.amount, data.id]
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

app.delete("/Ingridients/:id", (req, res, next) => {
    var sql ="delete from Ingridients where id = ?"
    var params = [req.params.id]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err})
            return;
        }
        res.json({
            "message": "success",
            "data": "Status OK",    
        })
    });
})

module.exports = app;