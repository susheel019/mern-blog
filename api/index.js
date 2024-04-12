const express = require("express");
const connection = require("./Bll/connection");

const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoute");

const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

var urlEncoded = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/user/", urlEncoded, userRouter);
app.use("/api/auth/", urlEncoded, authRouter);
app.use("/api/post/", urlEncoded, postRouter);
app.use("/api/comment/", urlEncoded, commentRouter);

app.listen(7080, (req, res) => {
  console.log("server is running at http://127.0.0.1:7080");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
