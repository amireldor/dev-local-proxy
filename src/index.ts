import arg from "arg";
import bombail from "@sgarciac/bombadil";

console.log("Hello!");

try {
  const args = arg({
    // Types
    "--config": String,
    "-c": "--config",
  });

  const { "--config": configFile = "dev-local-proxy.toml" } = args;

  console.log(configFile);
} catch (err) {
  if (err.code === "ARG_UNKNOWN_OPTION") {
    console.log(err.message);
  } else {
    throw err;
  }
}
