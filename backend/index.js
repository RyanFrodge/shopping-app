
// {
//     "_id": "1",
//     "name": "Tomatoes",
//     "description": "Green cherry tomatoes",
//     "quantity": "1",
//     "purchased": true
//     }
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
let items = require("./model");

app.use(bodyParser.json())

app.use(cors());

const router = express.Router();


mongoose.connect("mongodb://127.0.0.1:27017/ShoppingList", {
    useNewUrlParser: true
});


const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Connection with MongoDB was successful");
});


app.use("/", router);


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

router.route("/items").get(function (req, res) {
    items.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.route("/items/addItem").post(function (req, res) {
    console.log(req.body)
    const matchDocument = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        purchased: req.body.purchased
    };

    items.create(matchDocument, function (err, result) {
        if (err) {
            res.status(400).send("Error inserting matches!");
        } else {
            console.log(`Added a new match with id ${result._id}`);
            res.send(result);
        }
    });
});


router.route("/items/deleteItem/:id").delete((req, res) => {
    const query = { _id: req.params.id };

    items.deleteOne(query, function (err, _result) {
        if (err) {
            res.status(400).send(`Error deleting listing with id ${query._id}!`);
        } else {
            console.log("1 document deleted");
            res.send({
                _id: query._id
            });
        }
    });
});


router.route("/items/editItem/:id").post(function (req, res) {
    console.log(req.body)
    const listingQuery = { _id: req.body._id };
    const updates = {
        $set: {
            "name": req.body.name,
            "description": req.body.description,
            "quantity": req.body.quantity,
            "purchased": req.body.purchased
        }
    };

    items.updateOne(listingQuery, updates, function (err, _result) {
            if (err) {
                res.status(400).send(`Error updating listing with id ${listingQuery._id}!`);
            } else {
                console.log("1 document updated");
                res.send({
                    _id: listingQuery._id, 
                    name: updates["$set"].name,
                    description: updates["$set"].description,
                    quantity: updates["$set"].quantity,
                    purchased: updates["$set"].purchased,
                })
            }
        });
});

