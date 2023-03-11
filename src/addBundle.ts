import decompress from "decompress";
import fs from "fs";

async function addBundle(path: string, buildNumber: string, app: string) {
  const files = await decompress(path, `./files/bundles/${buildNumber}/${app}`);
  fs.rmSync(path);
}

export { addBundle };
