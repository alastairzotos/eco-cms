const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const findup = require('findup-sync');
const dotenv = require('dotenv');
const { readdirSync, statSync } = require('fs');

dotenv.config({ path: findup('.env', { cwd: __dirname })});

const mode = process.env.MODE;

const isDev = mode === 'development';

const plugins = [
    new HtmlWebpackPlugin({
        chunks: ["index"],
        filename: '../../server/public/index.html',
        template: '../server/templates/index.template.html',
        favicon: './favicon.ico'
    }),
];

const srcDir = path.resolve(__dirname, 'src');

const parseModulesToAlias = (p) =>
  readdirSync(p)
    .filter((f) => statSync(`${p}/${f}`).isDirectory())
    .reduce((dirs, current) => ({
      ...dirs,
      [`~${current}`]: path.resolve(__dirname, `${p}/${current}`),
    }), {});

module.exports = {
    mode,

    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
    },

    devServer: {
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },

    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        minimize: false,
        splitChunks: false
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
        alias: {
            '~': srcDir,
            ...parseModulesToAlias(`${srcDir}/modules`),
        }
    },

    plugins,

    output: {
        filename: isDev ? '[name].js' : '[name].[chunkhash].js',
        pathinfo: false,
        path: path.resolve(__dirname, '..', 'server', 'public'),
        publicPath: '/'
    },
};
