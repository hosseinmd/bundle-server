import decompress from "decompress";

async function addBundle(path: string, buildNumber: string) {
  const files = await decompress(path, `./files/bundles/${buildNumber}`);
}

export { addBundle };
