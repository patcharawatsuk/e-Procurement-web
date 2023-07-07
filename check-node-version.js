const semver = require("semver");
const { engines } = require("./package.json");

const requiredNodeVersion = engines.node;

if (!semver.satisfies(process.version, requiredNodeVersion)) {
  console.error(
    `You are using Node.js ${process.version}, but this project requires Node.js ${requiredNodeVersion}. Please upgrade your Node.js version before running.`
  );
  process.exit(1);
}
