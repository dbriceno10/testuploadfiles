// const express = require("express");
// const app = express();
// const multer = require("multer");
// const mimeTypes = require("mime-types");
// const cors = require("cors");

// app.use(cors());

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: function (req, file, cb) {
//     cb(
//       "",
//       Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", (req, res) => {
//   // res.send("Hello World!");
//   res.sendFile(__dirname + "/views/index.html");
//   // console.log(__dirname);
// });

// app.post("/files", upload.single("avatar"), (req, res) => {
//   res.send("File uploaded!");
// });

// app.listen(8080, () => console.log("Server is running on port 8080"));

const express = require("express");
const app = express();
const mimeTypes = require("mime-types");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
      // Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("this is de the home page");
});

app.post("/files", upload.single("file"), (req, res) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  return res.send(req.file);
});

app.listen(8080, () => console.log("Server is running on port 8080"));
