const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zvhsc2c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    client
        .connect()
        .then((client) => {
            console.log("connected");
        })
        .catch((error) => {
            console.log(error);
        });
}

app.use(bodyParser.json());

const addUser = async (req, res) => {
    try {
        const { password, username } = req.body;
        const db = client.db("node-express-sample-app");

        const collection = db.collection("users");

        const newUser = { userName: username, password: password };

        const result = await collection.insertOne(newUser);

        return result;
    } catch (error) {
        throw error;
    }
};

app.post("/users", async function (req, res) {
    const user = await addUser(req);

    res.send(user);
});

run();

app.listen(3000);
