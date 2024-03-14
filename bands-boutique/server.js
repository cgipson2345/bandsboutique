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
const mongoURI = "mongodb+srv://torisutansan02:Pus9dTyVEe8xUEEq@bandsboutique.68oxbvu.mongodb.net/?retryWrites=true&w=majority";;

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
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error logging in');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = User; // Export the User model after defining routes
