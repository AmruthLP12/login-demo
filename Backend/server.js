const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());


// Middleware for JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://image:image123@cloudinary.ehjh8.mongodb.net/class?retryWrites=true&w=majority&appName=cloudinary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("Class", UserSchema);

// Routes
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// app.get("/data", async (req, res) => {
//   res.json({ data: "This is some public data!" });
// });


app.get("/data", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords for security
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
