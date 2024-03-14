const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI = "mongodb+srv://torisutansan02:Pus9dTyVEe8xUEEq@bandsboutique.68oxbvu.mongodb.net/?retryWrites=true&w=majority";

// MongoDB Atlas connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness of the username
    validate: {
      validator: function(v) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  item: String,
  price: Number,
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

// Route for user registration
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Check if username field is empty
  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Attempt to create a new user
    const newUser = await User.create({ username, password: hashedPassword, email });
    res.status(200).send('User registered successfully');
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      // If the error is due to a duplicate key (email), send a specific error message
      return res.status(409).send('Email is already registered');
    }
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Route for user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare the hashed password stored in the database with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error logging in');
  }
});

// Create Purchase Endpoint
app.post('/api/purchase', async (req, res) => {
  const { item, price } = req.body;
  
  try {
    // Extract user ID from token
    const token = req.headers.authorization.split(' ')[1]; // Extract token from authorization header
    const decodedToken = jwt.verify(token, 'secret_key');
    const userId = decodedToken.userId; // Assuming userId is stored in the token payload

    await Purchase.create({ user: userId, item, price });
    res.status(200).send('Item purchased successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error purchasing item');
  }
});

// Retrieve Purchase History Endpoint
app.get('/api/purchase-history', async (req, res) => {
  // Extract user ID from token
  const token = req.headers.authorization.split(' ')[1]; // Extract token from authorization header
  const decodedToken = jwt.verify(token, 'secret_key');
  const userId = decodedToken.userId; // Assuming userId is stored in the token payload

  try {
    const purchases = await Purchase.find({ user: userId }).sort({ purchaseDate: -1 });
    res.status(200).json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving purchase history');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = User; // Export the User model after defining routes
