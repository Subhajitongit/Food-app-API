const express = require("express");
const userRouter = require("./routers/userRouter");
const planRouter = require("./routers/planRouter");
const authRouter = require("./routers/authRouter");
const reviewRouter = require("./Routers/reviewRouter");
const cookieParser = require("cookie-parser");

const app = express();

//required to make POST requests
app.use(express.json()); //global middleware
app.use(express.urlencoded({ extended: false }));

//global middleware for using cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(<p>Welcome to the server!</p>);
});

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plan", planRouter);
app.use("/review", reviewRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and running");
});
