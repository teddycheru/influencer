const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const app = express();
const router = require("./router");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json"); // Generated Swagger file*
const Post = require("./models/Post/post");
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const CronJob = require("cron").CronJob;

// Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

// app.use(express.json());
// app.use(cors());
// app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(loggerMiddleware);

// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// router index

app.use(multer().array("pictures"));

app.use("/", router);
// api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("Post draft BE v2.3 main");
});

const expirePosts = new CronJob(
  "* */6 * * *", //every 6 hours
  async function () {
    console.log("Checking Posts to Expire");

    Post.find({
      expired: false,
    })
      .populate("user")
      .then((posts) => {
        if (posts.length > 0) {
          posts.map((data) => {
            if (
              moment(moment(data.updatedAt).format("YYYY-MM-DD")).isBefore(
                moment().format("YYYY-MM-DD")
              ) &&
              !moment(moment(data.updatedAt).format("YYYY-MM-DD")).isSame(
                moment().subtract(1, "d").format("YYYY-MM-DD")
              ) &&
              !data.user.premium
            ) {
              data.expired = true;
              data.save();
            }
          });
        }
      });
  },
  null,
  null,
  "Asia/Karachi"
);

expirePosts.start();
// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(404, "Not found"));
// });

module.exports = app;
