import util from "util";
import fs from "fs";
import { join } from "path";

const existsAsync = util.promisify(fs.exists);
const renameAsync = util.promisify(fs.rename);

async function addAPK(
  path: string,
  buildNumber: string,
  variant: string,
  mode: string
): Promise<string> {
  let name = `Digikala-${buildNumber}-${variant}-${mode}.apk`;
  const newPath = join(__dirname, "../files/apks/", name);
  if (await existsAsync(newPath)) {
    return addAPK(
      path,
      buildNumber,
      variant,
      `${mode}-${new Date().getTime()}`
    );
  }

  await renameAsync(path, newPath);

  return `/apks/${name}`;
}

export { addAPK };
