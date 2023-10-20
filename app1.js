const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ORDERS'); 
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
});

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String
});

const User = mongoose.model('User', userSchema, 'user'); 

app.post('/order', function (req, res) {
    var Name = req.body.name;
    var Email = req.body.email;
    var Phone = req.body.phone;
    var Address=req.body.address;

    const newUser = new User({
        "name": Name,
        "email": Email,
        "phone": Phone,
        "address":Address
    });

    newUser.save()
        .then(() => {
            console.log("Ordered successfully");
            return res.redirect('success1.html');
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error saving user.');
        });
});

app.listen(8000, () => {
    console.log("Server listening at port 8000");
});
