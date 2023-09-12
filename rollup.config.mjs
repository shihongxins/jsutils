import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._SHXS_JS_UTILS_VERSION_ = '${pkg.version}'
}`;

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "esm",
        footer,
      },
      {
        file: pkg.main,
        format: "umd",
        name: "SHXsJSUtils",
        footer,
        globals: {
          dayjs: "dayjs",
        },
      },
    ],
    external: ["dayjs"],
    // eslint-disable-next-line prettier/prettier
    plugins: [
      del({ targets: "dist" }),
      resolve(),
      commonjs(),
      /**
       * // TODO: I don't know why this plugin emit declaration files to /dist/types rather than /types ?
       * So I use tsc to generate declaration files instead of this plugin.
       */
      typescript({
        sourceMap: false,
        declaration: false,
        declarationDir: undefined,
      }),
      terser({ sourceMap: true }),
    ],
  },
  {
    input: pkg.types,
    output: {
      file: pkg.types,
      format: "esm",
    },
    plugins: [
      dts(),
      del({
        targets: "types",
        hook: "buildEnd",
      }),
    ],
  },
]);
