var path 	 		= require('path'),
    express         = require('express'),    
    app             = express(),
    port            = process.env.PORT || 8080,
    http            = require('http').Server(app),    
    engine          = require('ejs-locals'),    
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json({limit: '25mb'})); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(path.join(__dirname, '/public')));

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));

http.listen(port, function(){ 
    console.log('The magic happens on port %d', port);    
}); 