//Stock Market portfolio app by SBTOPZZZ
const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const body_parser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Use body parser middleware
app.use(body_parser.urlencoded({extended: false}));

// API key = pk_30f57c6112ce4846a80c05c95fffe2d2
// Create call API function
function call_api(finished_api, ticker) {
	var ticker2 = "fb";
	if (ticker) ticker2=ticker;
	request("https://cloud.iexapis.com/stable/stock/"+ticker2+"/quote?token=pk_30f57c6112ce4846a80c05c95fffe2d2", {json: true}, (err, res, body) => {
	if (err) return console.log(err);
	finished_api(body);
});
};

// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello there! This is other stuff!";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
    		stock: doneAPI
    	});
	});
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	posted_stuff = req.body.stock_ticker;
	call_api(function(doneAPI) {
		res.render('home', {
    		stock: doneAPI
    	});
	}, posted_stuff);
});

// Create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on port "+PORT));