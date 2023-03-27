var bodyParser = require("body-parser");
var express = require("express")
var app = express()
var cors = require('cors')
var morgan = require('morgan')
const ingridient = require('./routers/ingridientrouter')
const recipes = require('./routers/recipesrouter')

app.use(morgan('combined'))

var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(ingridient);
app.use(recipes);

app.use(function(req, res){
    res.status(404);
});




