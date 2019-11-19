const   express     = require('express'),
        path        = require('path'),
        bodyParser  = require('body-parser'),
        cors        = require('cors'),
        morgan      = require('morgan'),
        app         = express();


// For Connecting to PSQL
const {Client} = require('pg');
const conString = "postgres://pevn_admin:pevn1234@localhost/g_stores";
const client = new Client({
    connectionString: conString,
});

var ID = function () {
    return Math.random().toString(36).substr(2,9);
}


app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((cors()));
client.connect();


// ******************* Get all User ***************** // 
app.get('/', function(req, res) {
  
    client.query('SELECT * FROM users', function(err, result) {
        if (err) {
            return console.log('error running register query', err);
        }
        //sending data to home route
        res.send(result.rows);
        // res.render('index', {users: result.rows});
    });
});



// ******************* REGISTER A NEW USER ***************** // 
// insert data to psql when register route is called
app.post('/register', (req, res) => {
    // need - username, password, isAdmin, 
        // ->> isAdmin  = staff_name, s_address, salary, job title,
        // ->> notAdmin = customer_name, phone_number, username, address, city, zipcode, state
    client.query('SELECT * FROM users WHERE username = $1', [req.body.username], (err, result) => {
        if (err) {
            return console.log('error running login query', err);
        }
        if (result.rows.length > 0) {
            res.send(false);
            return console.log('USER ALREADY EXIST');
        }
        // add user
        client.query('INSERT INTO users(username, pword, isAdmin) VALUES ($1, $2, $3)', 
                    [req.body.username, req.body.pword, false], (err, result) => {
                        if (err) {
                            
                        }
                    });
        
        // add Card
        client.query('INSERT INTO Card (username, billing_address, card_number, card_pin) VALUES ($1, $2, $3, $4)', 
                    [req.body.username, req.body.billing_address, req.body.card_number, req.body.card_pin]);

        // add customer
        client.query('INSERT INTO customer(username, customer_name, phone_number) VALUES ($1, $2, $3)', 
                    [req.body.username, req.body.customer_name, req.body.phone_number]);

        // add address
        client.query('INSERT INTO address(username, address, city, zipcode, state) VALUES ($1, $2, $3, $4, $5)', 
                    [req.body.username, req.body.address, req.body.city, req.body.zipcode, req.body.state]);
        
        res.send(true);
        return console.log("USER REGISTER SUCCESSFULLY");
         
    });
});

// ---- TRYING 
// app.post('/reg/:uname/:pword', (req, res) => {
//     client.query('INSERT INTO users(username, pword, isAdmin) VALUES ($1, $2, $3)', [req.params.uname, req.params.pword, true]);
//     console.log('successful register');
// }) 

// ******************* lOGGING IN A USER ***************** // 
app.get('/login/:uname/:pword/:isAdmin', (req, res) => {
    const uname = req.params.uname;
    const pword = req.params.pword;
    const isAdmin = req.params.isAdmin;
    console.log(isAdmin);
    client.query('SELECT * FROM users WHERE username = $1 AND pword = $2', [uname, pword], (err, result) => {
        var userData = [];
        if (err) {
            return console.log('error running login query', err);
        }

        if (result.rows.length > 0) {  // user exists
            if (isAdmin == 'true') {
                client.query('SELECT * FROM Staff where username = $1', [uname], (err, result) => {
                    if (err) {
                        res.send('ERROR IN STAFF')
                        return console.log(' error getting staff query', err);
                    }

                    userData.push(result.rows);
                })

                client.query('SELECT * FROM warehouse', (err, result) => {
                    if (err) {
                        res.send('ERROR IN STAFF WAREHOUSE')
                        return console.log('Error getting staff query', err)
                    }

                    userData.push(result.rows);
                })

                client.query('SELECT * FROM supplier', (err, result) => {
                    if (err) {
                        res.send('ERROR IN SUPPLIER')
                        return console.log('Error getting staff query', err)
                    }

                    userData.push(result.rows);
                    res.send(userData);
                })

                
            } else { // customer
                client.query('SELECT * FROM Customer where username = $1', [uname], (err, result) => {
                    if (err) {
                        return console.log(' error getting staff query', err);
                    }

                    userData.push(result.rows);
                })

                client.query('SELECT * FROM Address where username = $1', [uname], (err, result) => {
                    if (err) {
                        return console.log(' error getting staff query', err);
                    }

                    userData.push(result.rows);
                })

                client.query('SELECT * FROM Card where username = $1', [uname], (err, result) => {
                    if (err) {
                        return console.log(' error getting staff query', err);
                    }

                    userData.push(result.rows);
                    res.send(userData);
                })

                
            }
            
        } else {
            res.send(false);
        }
    });
    
})

// ******************* Add a new address to an existing user ***************** // 
app.post('/addAddress', (req, res) => {
    client.query('INSERT INTO Address (username, address, city, zipcode, state) VALUES ($1, $2, $3, $4, $5)', 
                [req.body.username, req.body.address, req.body.city, req.body.zipcode, req.body.state], (err, result) => {
                    if (err) {
                        res.send(false);
                        return console.log('ADD ADDRESS FAILED');
                    }
                    res.send(true);
                    return console.log('ADD ADDRESS FAILED');
                });
    // do whatever we want to do, can send back data as well
})


// ******************* Add a new payment method to an existing user ***************** // 
app.post('/addPayment', (req, res) => {
    client.query('INSERT INTO Card (billing_address, card_number, card_pin) VALUES ($1, $2, $3)', [req.body.billing_address, req.body.card_number, req.body.card_pin], (err, result) => {
        if (err) {
            res.send(false);
            return console.log('ADD PAYMENT FAILED');
        }
        res.send(true);
        return console.log('ADD PAYMENT Success');
    });
    // do whatever
})


// ****************** Add Product ******************** //
app.post('/addProduct', (req, res) => {
    client.query('INSERT INTO Product (product_name, product_price, category, p_weight, p_image) VALUES ($1, $2, $3, $4, $5)', 
                [req.body.product_name, req.body.product_price, req.body.category, req.body.p_weight, req.body.p_image], (err, result) => {
                    if (err) {
                        res.send(false);
                        return console.log('FAILED TO ADD PRODUCT!')
                    }
                    res.send(true);
                    console.log("SUCCESSFULLY ADDED A NEW PRODUCT!")
                });

    client.query('SELECT * FROM Product', (err, result) => {
        var p_id = result.rows[result.rows.length-1].product_id;
        client.query('INSERT INTO Stocks (warehouse_id, product_id, quantity) VALUES ($1, $2, $3)', 
                    [req.body.warehouse_id, p_id, req.body.product_quantity], (err, result) => {
                        if (err) {
                            res.send(false);
                            return console.log('ERROR IN ADDING NEW PRODUCT TO STOCKS');
                        }

                        res.send(true);
                        return console.log('ADDED NEW PRODUCT SUCCESSFULLY IN STOCKS');
                    })
    })
    
})

app.delete('/deleteProduct/:id', (req, res) => {
    const id = parseInt(req.params.id);
    client.query('DELETE FROM Product where id = $1', [id], (err, res) => {
        if (err) {
            res.send(false);
            return console.log('ERROR IN DELETE PRODUCT');
        }

        res.send(true);
        return console.log("SUCCESSFULLY DELTED A PRODUCT");
    })
})

// *******************  Update quantity of a Product ***************** // 
app.put('/updateQuantity', (req, res) => {
    client.query('UPDATE Stocks SET quantity = $1 WHERE product_id = $2', [req.body.product_quantity, req.body.product_id], (err, result) => {
        if (err) {
            res.send(false);
            return console.log('Update Quantity FAILED');
        }
        res.send(true);
        return console.log('Update Quantity Success');
    });
    // do whatever if needed
})


// ****************** Update Product Pricing ********************* //
app.put('/updateProduct', (req, res) => {

})

// *******************  Add Order and Contains ***************** // 
app.post('/addOrder', (req, res) => {
    for (var i = 0; i < req.body.product_id; i++) {
        var id = ID();
        client.query('INSERT INTO Order (order_id, username, order_status, delivery_address, card_number, card_pin, billing_address) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                    [id, req.body.username, 'pending', req.body.delivery_address, req.body.card_number, req.body.card_pin, req.body.billing_address], (err, result) => {
            if (err) {
                res.send(false);
                return console.log('Add Order FAILED - before adding to TABLE CONTAINS');
            } else {
                client.query('INSERT INTO Contain (order_id, product_id, price_amount, product_quantity) VALUES ($1, $2, $3, $4)', [id, req.body.product_id[i], req.body.price_amount, req.body.product_quantity], (err, result) => {
                    console.log('ADD Order Successfully');
                })
            }
        });
    }

    res.send(true);
    return console.log('ALL ORDERS ADDED SUCCESSFULLY')
    

})

// ****************  Get all products ***************//
app.get('/getAllProducts', (req, res) => {
    client.query('SELECT * FROM Product Natural Join Stocks', (err, result) => {
        if (err) {
            res.send(false);
            return console.log('error retreiving product query', err);
        }

        res.send(result.rows);
    })
})


app.listen(3000, function() {
    console.log('Server is running on 3000');
    console.log(ID());

});