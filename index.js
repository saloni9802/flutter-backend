const express = require('express');
const mongoose = require('mongoose');

const User = require('./model/user'); 
var cors = require('cors')


const app = express();

const port = 3000; 

app.use(express.urlencoded({extended:true}))
app.use(cors())
mongoose.connect('mongodb://localhost:27017/webservice')
.then(() => {
  console.log("Connected to database");
})
.catch((error) => {
  console.error("Database connection error:", error);
});


app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
