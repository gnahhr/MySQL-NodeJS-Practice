//Require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth');

//Public Directory/Ports    
const publicDir = path.join(__dirname, './public');
const port = 3002;

//Use of express module
const app = express();

//Environment Kemerut
app.use(express.static(publicDir)); //CSS
app.use(express.static('./')); //Default Directory
app.use(bodyParser.urlencoded({ extended: false })); //Parse HTML Forms

//Routes
app.use('/', require('./routes/pages'));
app.use('/', require('./routes/methods'));

//View Engine
app.set('view engine', 'hbs'); //Render HTML

/*Request from server
getConnection().query("SELECT * FROM tbluser", (err, rows, fields) => {
    if (err) {
        console.log("An error occured");
    }
    console.log(rows);
})*/

//GET Functions
app.listen(port, () => {
    console.log(`Server is at port ${port}`);
})