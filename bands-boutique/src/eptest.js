// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./Models/users');

mongoose.connect("mongodb+srv://cgipson234:oehUZohjqhMlFyYQ@180cluster.qdrez0t.mongodb.net/shopdatabase?retryWrites=true&w=majority");

const userRoute = express.Router();

userRoute.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        console.log(users); // Log the fetched data
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/', userRoute);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
