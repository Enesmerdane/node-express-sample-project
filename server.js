const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

const routes = require("./routes");

require("dotenv").config();

const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    return mongoose.connect(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}

app.use(bodyParser.json());

app.use("/api", routes);

let mongoclient;
run()
    .then((client) => {
        console.log("connected");
        app.listen(3000);
        console.log("App listening port 3000");
        mongoclient = client;
    })
    .catch((error) => {
        console.log(error);
    });
// .finally(() => {
//     mongoclient.close();
// });
