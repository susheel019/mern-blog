const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

//signup api logic code
async function signup(req, res, next) {
  const { userName, email, password } = req.body;
  if (
    !userName ||
    !email ||
    !password ||
    userName === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All field are required"));
  }
  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });
      try {
        await newUser.save();
        res.json("SignUp Successfull");
      } catch (error) {
        next(error);
      }
    }
  }
}

// signin api logic code
async function signin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found "));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    //by using it server will not send password to client
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
}

async function google(req, res, next) {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        userName:
          name.toLowerCase().replace(/\s/g, "").split(".").join("") +
          Math.random().toString(36).slice(-4).trim(),
        email,
        password: hashedPassword,
        profilePicture: req.body.profilePicture,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, signin, google };
