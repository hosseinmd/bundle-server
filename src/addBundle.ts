import decompress from "decompress";

async function addBundle(path: string, buildNumber: string, app: string) {
  const files = await decompress(path, `./files/bundles/${buildNumber}/${app}`);
}

export { addBundle };
