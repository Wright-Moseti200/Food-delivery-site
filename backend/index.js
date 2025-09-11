const express = require('express');
const cors = require("cors");
const app = express();
const port = 4000;
const { mongodb } = require("./database");
const { UserRouter } = require('./routes/userRoutes');

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("Express server is running");
});

app.use("/api", UserRouter);

mongodb();

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});