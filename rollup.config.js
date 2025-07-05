const {
  minify,
  target = "es5",
  format = "umd",
  npm_package_globalObject,
} = process.env;

const outputName = npm_package_globalObject || "dp.devices";

import node from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: `dist/${target}/index.js`,
  external: ["@digitalpersona/core", "@digitalpersona/services", "WebSdk"],
  output: {
    format,
    extend: true,
    name: outputName,
    globals: {
      "@digitalpersona/core": "dp.core",
      "@digitalpersona/services": "dp.services",
      WebSdk: "WebSdk",
    },
    file: `dist/${target}.bundles/index.${format}${minify ? ".min" : ""}.js`,
    sourcemap: true,
  },
  plugins: [node(), ...(minify ? [terser()] : [])],
};
