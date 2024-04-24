const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { UserModal, userValidationSchema } = require('./model/User.js');
const SneakerModel = require('./model/sneaker.js'); // Import the SneakerModel
const routes = require('./routes.js');
const jwt = require('jsonwebtoken')
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// MongoDB URI for UserModel
const userModalURI = "mongodb+srv://nandithak:nanditha2004@cluster0.hnqjcip.mongodb.net/Cites?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB URI for SneakerModel
const sneakerModalURI = "mongodb://localhost:27017/sneakermodal";

// Connect to MongoDB for UserModal
async function connectToUserDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(userModalURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to UserModal DB at ${userModalURI}`);
    } else {
        console.log(`Already connected to UserModal DB at ${userModalURI}`);
    }
}

// Connect to MongoDB for SneakerModel
async function connectToSneakerDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(sneakerModalURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected to SneakerModal DB at ${sneakerModalURI}`);
    } else {
        console.log(`Already connected to SneakerModal DB at ${sneakerModalURI}`);
    }
}

// Define routes for UserModel
app.get('/users', async (req, res) => {
    try {
        const users = await UserModal.find({});
        // res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModal.findById(id);
        // res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModal.findByIdAndUpdate(
            id,
            { name: req.body.name, email: req.body.email,  password: req.body.password},
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await UserModal.findByIdAndDelete(userId);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Remove a cookie when a user logs in
app.post("/login", async (req, res) => {
    try {
        // Assuming your login logic involves checking credentials
        const { email, password } = req.body;
        
        // Find the user in the MongoDB database
        const user = await UserModal.findOne({ email, password });
        const accesstoken = jwt.sign({password},process.env.accesstoken_secret)

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        res.cookie('token',accesstoken)
        res.json({ message: 'Login successful', user , accesstoken:accesstoken});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Access token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
        req.user = decoded; // Add decoded information to the request object
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.post("/users", async (req, res) => { // Corrected route name
    try {
        // Validate input using Joi
        // Define or import userValidationSchema here

        // const { error } = userValidationSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ error: error.details[0].message });
        // }

        const newUser = await UserModal.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Define routes for SneakerModel
app.use("/main", routes);

app.get("/", async (req, res) => {
    try {
        // Use the SneakerModel here
        const sneakerModels = await SneakerModel.find();
        // console.log(sneakerModels);
        res.json(sneakerModels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Connect to databases and start the servers
Promise.all([connectToUserDB(), connectToSneakerDB()]).then(() => {
    const userModalServer = app.listen(3001, () => {
        console.log("Server is running on port 3001 for UserModal");
    });

    const sneakerModalServer = app.listen(3000, () => {
        console.log("Server is running on port 3000 for SneakerModal");
    });
});

module.exports = app;
