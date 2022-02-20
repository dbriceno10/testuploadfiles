const express = require("express");
const app = express();
const multer = require("multer");
const mimeTypes = require("mime-types");
const cors = require("cors");

app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      "",
      Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(__dirname + "/views/index.html");
  // console.log(__dirname);
});

app.post("/files", upload.single("avatar"), (req, res) => {
  res.send("File uploaded!");
});

app.listen(8080, () => console.log("Server is running on port 8080"));
