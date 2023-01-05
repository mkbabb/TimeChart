import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

const config = {
    input: ["src/index.ts"],
    output: [{ file: "dist/timechart.js", format: "es", sourcemap: true }],
    // external: (id) => id.startsWith("d3-"),
    watch: {
        include: "src/**",
    },
    plugins: [
        resolve({ browser: true }),
        postcss({
            extract: true,
            writeDefinitions: true,
            modules: true,
            namedExports: true,
            use: ["sass"],
        }),
        commonjs(),
        typescript({ tsconfig: "tsconfig.json" }),
        // terser({ sourceMap: true }),
    ],
};

export default [config];
