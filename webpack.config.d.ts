/// <reference types="node" />
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ResolveTsForJsPlugin from './ResolveTsForJsPlugin.class.js';
declare const _default: {
    mode: string;
    devtool: string;
    entry: string;
    output: {
        filename: string;
        path: string;
        libraryTarget: string;
        chunkFormat: string;
    };
    experiments: {
        outputModule: boolean;
    };
    target: string;
    resolve: {
        extensions: string[];
        alias: {};
    };
    module: {
        rules: {
            test: RegExp;
            use: string;
            exclude: RegExp;
        }[];
    };
    optimization: {
        minimize: boolean;
        minimizer: TerserPlugin<import("terser").MinifyOptions>[];
    };
    plugins: (ResolveTsForJsPlugin | CompressionPlugin<import("zlib").ZlibOptions>)[];
};
export default _default;
