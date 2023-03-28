var bodyParser = require("body-parser");
var express = require("express")
var app = express()
var cors = require('cors')
var morgan = require('morgan')
const ingridient = require('./routers/ingridientrouter')
const recipes = require('./routers/recipesrouter')
const path = require('path')

app.use(morgan('combined'))

var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static(path.join(__dirname, '../client', 'build')))

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
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




