import { execSync } from "child_process";
import path from "path";

import fs from "fs-extra";

const { version } = fs.readJSONSync("package.json");

console.log(`Releasing v${version}...`);
updatePackageJSON();
function updatePackageJSON() {
  const { version } = fs.readJSONSync("package.json");
  const packageJSONPath = path.join("src/uni_modules/uvue-crud/package.json");
  if (!fs.existsSync(packageJSONPath)) return;
  const packageJSON = fs.readJSONSync(packageJSONPath);
  packageJSON.version = version;
  fs.writeJSONSync(packageJSONPath, packageJSON, { spaces: 2 });
}

console.log("Generating changelog...");
execSync("pnpm changelog");

console.log("Committing changes...");
execSync("git add .");
execSync(`git commit -m "chore: release v${version}"`);
execSync(`git tag -a v${version} -m "v${version}"`);
