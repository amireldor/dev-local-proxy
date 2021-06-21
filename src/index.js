"use strict";
var _a;
exports.__esModule = true;
var arg_1 = require("arg");
var fs_1 = require("fs");
console.log("Hello!");
var configFile;
try {
  var args = arg_1["default"]({
    // Types
    "--config": String,
    "-c": "--config",
  });
  configFile =
    (_a = args["--config"]) !== null && _a !== void 0
      ? _a
      : "dev-local-proxy.toml";
} catch (err) {
  if (err.code === "ARG_UNKNOWN_OPTION") {
    console.log(err.message);
    process.exit(1);
  } else {
    throw err;
  }
}
console.log(configFile);
try {
  var tomlContents = fs_1["default"].readFileSync(configFile, {
    encoding: "utf-8",
  });
  reader.readToml(tomlContents);
  console.log(reader.errors);
  console.log(reader.result);
} catch (err) {
  console.log(err.message);
}
