const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

function test(req, res) {
  res.send("hello susheel");
}

async function updateUser(req, res, next) {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to upadate this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return next(errorHandler(400, "Username must be 7 to 20 characters"));
    }
    if (req.body.userName.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteUser(req, res, next) {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(
      errorHandler(404, "You are not allowed to delete this account")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error)
  }
}

function signout(req, res, next) {
  try {
    res.clearCookie("access_token").status(200).json("user has been sign out");
  } catch (error) {
    next(error);
  }
}

async function getusers(req, res, next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const user = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = user.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUser = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getDay(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUser = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPassword,
      totalUser,
      lastMonthUser,
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req,res,next){
  try{
    const user = await User.findById(req.params.userId);
    if(!user){
      return next(errorHandler(404 , 'User not found'));
    };
    const {password , ...rest} = user._doc;
    res.status(200).json(rest);
  }catch(error){
    next(error);
  };

};

module.exports = { test, updateUser, deleteUser, signout, getusers ,getUser};
