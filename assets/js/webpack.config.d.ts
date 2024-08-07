import TerserPlugin from 'terser-webpack-plugin';
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
        rules: ({
            test: RegExp;
            use: string;
            exclude: RegExp;
        } | {
            test: RegExp;
            use: string[];
            exclude?: undefined;
        })[];
    };
    optimization: {
        minimize: boolean;
        minimizer: TerserPlugin<import("terser").MinifyOptions>[];
    };
    plugins: ResolveTsForJsPlugin[];
};
export default _default;
