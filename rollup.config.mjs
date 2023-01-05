import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const config = {
    input: `src/index.ts`,
    output: [
        { file: "dist/timechart.module.js", format: "es", sourcemap: true },
    ],
    external: (id) => id.startsWith("d3-"),
    watch: {
        include: "src/**",
    },
    plugins: [typescript(), commonjs(), resolve(), terser()],
};

export default [config];
