import arg from "arg";
import fs from "fs";

console.log("Hello!");

let configFile;

try {
  const args = arg({
    // Types
    "--config": String,
    "-c": "--config",
  });

  configFile = args["--config"] ?? "dev-local-proxy.json";
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
  const contents = fs.readFileSync(configFile, { encoding: "utf8" });
  const config = JSON.parse(contents);
  console.log(config);
} catch (err) {
  console.log(err.message);
}
