import pkg from "./package.json" assert { type: "json" };

import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._SHXS_JS_UTILS_VERSION_ = '${pkg.version}'
}`;

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      footer,
    },
    {
      file: pkg.module,
      format: "esm",
      footer,
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "SHXsJSUtils",
      footer,
    },
  ],
  plugins: [typescript(), commonjs(), resolve()],
};
