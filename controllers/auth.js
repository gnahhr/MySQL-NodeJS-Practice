const mysql = require('mysql');

//Register method
exports.register = (req, res) => {
    //Get values from html forms
    const username = req.body.username.toUpperCase(); //Bypasses case-sensitive comparison
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const midName = req.body.midName;
    const pass = req.body.pass;
    const conPass = req.body.conPass;
    const mail = req.body.mail;


    //Query to find if similar email exists
    const queryString = "SELECT * FROM tbluser WHERE email = ? UNION SELECT * FROM tbluser WHERE username = ?";

    //Does the query and return results
    getConnection().query(queryString, [mail, username], (err, results) => {
        if (err) {
            console.log("Error insertion");
            return;
        }
        console.log(results);
        //Checks if email is taken or if password inputs are valid
        if (results.length > 0) {
            return res.status(400).render("register", {
                message: 'E-mail/Username already taken'
            });
        } else if (pass !== conPass) {
            return res.status(400).render("register", {
                message: 'Password mismatch'
            });
        } else if (pass.length < 8 || conPass.length < 8) {
            return res.status(400).render("register", {
                message: 'Password less than 8 characters',
            });
        }

        //If all conditions are bypassed, inserts the form values into the database
        const queryString2 = "INSERT INTO tbluser VALUES (?, ?, ?, NULL, ?, ?, ?)";
        getConnection().query(queryString2, [username, pass, mail, firstName, lastName, midName], (err, results) => {
            try {
                //Inserts log of registered user into the history
                const getStudNum = `SELECT studentnum FROM tbluser WHERE email = ?`;
                getConnection().query(getStudNum, [mail], (err, results) => {
                    const insertLog = `INSERT INTO tblog VALUES (NULL, ?, ?, "? has registered", current_timestamp())`;
                    getConnection().query(insertLog, [results[0].studentnum, username, username], (err, results) => results);
                });
                console.log("New user registered!");
                return res.render("reg-done");
            } catch (err) {
                console.log(err);
                return;
            }
        })
    })
}

//Log in user
exports.login_user = (req, res) => {
    const username = req.body.username.toUpperCase(); //Bypasses case-sensitive comparison
    const pass = req.body.pass;

    //Gets values from tbluser where users are managed
    const queryString = "SELECT * FROM tbluser WHERE username = ?;";
    getConnection().query(queryString, [username], (err, results) => {
        if (err) {
            console.log("Error insertion");
            return;
        }
        if (results.length < 1 || (pass !== results[0].password)) {
            console.log("No user registered");
            return res.render('log-in', {
                message: 'Wrong username/password.',
                user: 1,
            })
        } else {
            //If all credentials are correct, the log in will be written at the history log.
            const insertLog = `INSERT INTO tblog VALUES (NULL, ?, ?, "? has logged in", current_timestamp())`;
            getConnection().query(insertLog, [results[0].studentnum, username, username], (err, results) => results);
            console.log("You have logged in");


            //Goes to the user page displaying user profile
            return res.render("user", {
                user: username,
                isUser: 1,
                data: results
            });
        }
        res.end();
    })
}

//Admin log in
exports.login_admin = (req, res) => {
    const user = req.body.user.toUpperCase();
    const pass = req.body.pass;

    //Gets values from tbladmin where the admin data are managed
    const queryString = "SELECT password FROM tbladmin WHERE username = ?;";
    getConnection().query(queryString, [user], (err, results) => {
        console.log(results);
        if (err) {
            console.log("Error insertion");
            return;
        }
        if (results.length < 1 || (pass !== results[0].password)) {
            console.log("No user registered");
            return res.render('log-in_admin', {
                message: 'Wrong username/password.',
            })
        } else {
            //Inserts the log in history into the log table
            const insertLog = `INSERT INTO tblog VALUES (NULL, NULL, ?, "? has logged in", current_timestamp())`;
            getConnection().query(insertLog, [user, user], (err, results) => results);
            console.log("You have logged in");
            //Goes to the user page with admin priveleges
            return res.render("user", {
                user: 'Admin',
                isAdmin: 1,
            });
        }
        res.end();
    })
}

//Shows log of logged in and registered users
exports.showLog = (req, res) => {
    const queryLog = "SELECT logDate, logData, logUser FROM tblog";
    getConnection().query(queryLog, (err, rows) => {
        if (rows.length > 0) {
            console.log("Log showed");
            return res.render('user', {
                user: 'Admin',
                showLog: 1,
                isAdmin: 1,
                log: rows,
            });
        } else {
            console.log("Log showed");
            return res.render('user', {
                user: 'Admin',
                isAdmin: 1,
                message: 'There is still no history log',
            });
        }
    });
};

//Connection to MySQL
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'myDatabase'
    });
}