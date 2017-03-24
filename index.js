var path 	 		    = require('path'),
    express             = require('express'),    
    app                 = express(),
    port                = process.env.PORT || 8080,
    http                = require('http').Server(app),    
    engine              = require('ejs-locals'),    
    cookieParser        = require('cookie-parser'),
    bodyParser          = require('body-parser'),
    multipart           = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    session             = require('express-session');

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

app.post('/uploader', multipartMiddleware, function(req, res){
    var fs = require('fs');

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/public/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";

                res.send(html);
            }
        });
    });
});


app.post('/posts', function(req, res){
    res.status(200).json({
        messsage : ok,
        data :req.body
    });
});



http.listen(port, function(){ 
    console.log('The magic happens on port %d', port);    
}); 