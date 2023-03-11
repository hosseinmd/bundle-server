import express from "express";
import multer from "multer";
import { addBundle } from "./addBundle";
import { addAPK } from "./addAPK";

const upload = multer({ dest: "files/zips/" });
const uploadApk = multer({ dest: "files/apks/" });

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

app.post(
  "/upload_APK",
  uploadApk.single("file"),
  async function uploadFiles(req, res) {
    const buildNumber = req.headers.buildnumber as string;
    const variant = req.headers.variant as string;
    const mode = req.headers.mode as string;

    console.log(req.file);

    if (req.file) {
      const link = await addAPK(req.file?.path, buildNumber, variant, mode);
      res.json(link);
      return;
    }

    res.json({ message: "File is empty" });
    res.status(404);
  }
);

app.use("/bundles", express.static("files/bundles"));
app.use("/apks", express.static("files/apks"));

app.listen(8085, () => {
  console.log(`Server started... http://localhost:8085`);
});
