const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const authmiddleware = require("../middleware/auth.middleware");
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email_address, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error a raha hai " });
  }
});

router.post("/logout", authmiddleware, (req, res) => {
  try {
    // Optional: Add the current token to the blacklist
    const token = req.headers.authorization.split(" ")[1];
    blacklistedTokens.add(token);

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
