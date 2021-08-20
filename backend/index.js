const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// morgan dev logging
app.use(morgan("dev"));

const db = require("./models");
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

const logbook = require("./routes/logbook");
app.use("/api/logbook", logbook);

const user = require("./routes/user");
app.use("/api/user", user);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public"));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
