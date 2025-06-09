// const express = require('express');

// const app = express();
// const dbConnect = require('./config/database');
// const cookieParser = require('cookie-parser')
// require('dotenv').config();;
// const fileUpload = require("express-fileupload")

// const port = process.env.PORT
// const path = require('path')

// const _dirname = path.resolve();

// // Middlewares
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:5173',
//     credentials:true,            //access-control-allow-credentials:true

// }
// app.use(cors(corsOptions));
// app.use(express.json())
// app.use(cookieParser())

// //routes
// const authRouth = require('./routes/auth')
// const profileRouter = require('./routes/profile')
// const requestRouter = require('./routes/request');
// const userRouter = require('./routes/user');
// const likeCommentRouter = require('./routes/comment-like')
// const PostRouter = require('./routes/addPost')
// const reelrouter = require("./routes/addReel")
// const getreel = require('./routes/getReel')
// const getpost = require("./routes/getPost")

// app.use('/' ,authRouth)
// app.use('/' ,profileRouter)
// app.use('/' ,requestRouter)
// app.use('/',userRouter)
// app.use('/' , likeCommentRouter)
// app.use('/' , PostRouter)
// app.use('/' , reelrouter)
// app.use('/' ,getreel)
// app.use('/' , getpost)

// dbConnect().then(() => {
//     console.log('Connection successful');
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//         console.log(port)
//       });
// }).catch(err => {
//     console.error('Database connection failed:', err);
// });

// //yadavajjet05(user)  cHuG5KUCLr0ynu2G(password)

const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const http = require("http");
const initializeSocket = require("./utils/socket.js");

// Middlewares
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Import Routes
const authRouth = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const likeCommentRouter = require("./routes/comment-like");
const postRouter = require("./routes/addPost");
const reelRouter = require("./routes/addReel");
const getReel = require("./routes/getReel");
const getPost = require("./routes/getPost");
const otpRouter = require("./routes/otpLogin");
// const airouter = require("./routes/openai.js");
const mailRoute = require("./routes/mailRoute.js");
const routerSeeProfile = require("./routes/seeProfile.js");
const chatRouter = require("./routes/chat.js");

// Use Routes
app.use("/", authRouth);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", likeCommentRouter);
app.use("/", postRouter);
app.use("/", reelRouter);
app.use("/", getReel);
app.use("/", getPost);
app.use("/", otpRouter);
// app.use("/", airouter);
app.use("/", mailRoute);
app.use("/", routerSeeProfile);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

// Start Server
dbConnect()
  .then(() => {
    console.log("Connection successful");
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
