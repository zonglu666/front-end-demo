const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./dist/flatform/server";
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
});
