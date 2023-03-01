import express from "express";
import multer from "multer";
import decompress from "decompress";
import { addBundle } from "./addBundle";

const upload = multer({ dest: "files/zips/" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/upload_bundle",
  upload.single("file"),
  async function uploadFiles(req, res) {
    const buildNumber = req.headers.buildnumber as string;
    const app = req.headers.app as string;
    console.log({ buildNumber });
    console.log(req.file);
    if (req.file) {
      await addBundle(req.file?.path, buildNumber, app);
    }
    res.json({ message: "Successfully uploaded Bundle" });
  }
);

app.use("/bundles", express.static("files/bundles"));

app.listen(8085, () => {
  console.log(`Server started... http://localhost:8085`);
});
