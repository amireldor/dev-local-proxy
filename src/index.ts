import arg from "arg";
import fs from "fs";
import { AppConfig, createApp } from "./server";

console.log("Hello!");

let configFileName;
let args;

try {
  args = arg({
    // Types
    "--config": String,
    "-c": "--config",
  });

  configFileName = args["--config"] ?? "dev-local-proxy.json";
} catch (err) {
  if (err.code === "ARG_UNKNOWN_OPTION") {
    console.error(err.message);
    process.exit(1);
  } else {
    throw err;
  }
}

try {
  console.log(`Loading config from '${configFileName}'`);
  const contents = fs.readFileSync(configFileName, { encoding: "utf8" });
  const config = JSON.parse(contents);
  if (
    typeof config.routes !== "object" ||
    Object.keys(config.routes).length === 0
  ) {
    console.error("'routes' property is not an array");
    process.exit(1);
  }
  let good = true;
  Object.entries(config.routes).forEach(([pathname, route]: [string, any]) => {
    if (typeof route.url !== "string" && typeof route !== "string") {
      console.error(
        `Invalid 'routes.*.url' for '${pathname}' ('${route.url ?? route}')`
      );
      good = false;
    }
  });
  if (
    typeof config.hostname !== "undefined" &&
    typeof config.hostname !== "string"
  ) {
    console.error("`hostname` must be string.");
  }
  if (!good) {
    console.log("Bad configuration, existing.");
    process.exit(1);
  }
  const properConfig: AppConfig = {
    port: config.port ?? 3000,
    hostname: config.hostname ?? null,
    routes: config.routes,
  };
  const app = createApp(properConfig);
  app.run();
} catch (err) {
  console.log(err.message);
}
