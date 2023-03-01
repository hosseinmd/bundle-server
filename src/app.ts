import express from "express";
import multer from "multer";

const upload = multer({ dest: "files/zips/" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/upload_bundle",
  upload.single("file"),
  function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Successfully uploaded files" });
  }
);

app.use("/bundles", express.static("files/bundles"));

app.listen(9000, () => {
  console.log(`Server started... http://localhost:9000`);
});
