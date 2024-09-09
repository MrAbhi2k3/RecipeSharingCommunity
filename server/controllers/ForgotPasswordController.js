const bcrypt = require("bcrypt");
const User = require("../Schema/UserSchema");

const ForgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (user) {

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      await user.save();


      res.status(200).json({ message: "Password updated successfully" });
    } else {
  
      res
        .status(404)
        .json({ message: "No user found with this email address" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = ForgotPassword;
