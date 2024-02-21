const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./Models/users');
require('dotenv').config();
const cors = require('cors')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const userRoute = express.Router();
userRoute.use(express.json())
userRoute.use(cors())

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

userRoute.post("/createUser", async (req, res)=> {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)

})

app.use('/', userRoute);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
