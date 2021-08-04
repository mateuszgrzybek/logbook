const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const db = require("./backend/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Database Connection has been established.");
    })
    .catch(err => {
        console.log("[Error] Couldn't establish a database connection.", err);
        process.exit();
    });

const logbook = require("./backend/routes/logbook");
app.use("/api/logbook", logbook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
