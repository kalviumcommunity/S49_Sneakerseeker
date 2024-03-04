const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./model/User.js');
const SneakerModel = require('./model/sneaker.js');
const routes = require('./routes.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI for UserModel
const userModalURI = "mongodb+srv://nandithak:nanditha2004@cluster0.hnqjcip.mongodb.net/Cites?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB URI for SneakerModel
const sneakerModalURI = "mongodb://localhost:27017/sneakermodal"; // Update this with your actual database name for SneakerModel

// Connect to MongoDB
async function connectToDB(uri, dbName) {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to DB at ${uri}`);
    } else {
        console.log(`Already connected to DB at ${uri}`);
    }
}

// Define routes for UserModel
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ...Routes for UserModel (GET /users/:id, PUT /users/:id, DELETE /users/:id, POST /users)

// Define routes for SneakerModel
app.use("/main", routes);

app.get("/", async (req, res) => {
    try {
        const sneakerModels = await SneakerModel.find();
        console.log(sneakerModels);
        res.json(sneakerModels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Connect to databases and start the server
Promise.all([connectToDB(userModalURI, 'Cites'), connectToDB(sneakerModalURI, 'sneakermodal')]).then(() => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001 for UserModel");
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000 for SneakerModel");
    });
});

module.exports = app;
