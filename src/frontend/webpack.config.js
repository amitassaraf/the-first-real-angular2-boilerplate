// Helper: root() is defined at the bottom
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var colors = require('colors/safe');


/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isProd) {
        config.devtool = 'source-map';
    }
    else {
        config.devtool = 'eval-source-map';
    }

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/entry.ts'
        // our angular app
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        path: root('dist'),
        publicPath: '/static',
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        // only discover files that have those extensions
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
        unsafeCache: !isProd // Optimizes build times
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        rules: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: [/node_modules\/(?!(ng2-.+))/, root('dist')]
            },

            // Copy fonts
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=/fonts/[name].[hash].[ext]?',
                exclude: root('dist')
            },

            // Copy image assets
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=fonts/[name].[hash].[ext]?',
                exclude: root('dist')
            },

            // Support for *.json files.
            {test: /\.json$/, exclude: root('dist'), loader: 'json-loader'},

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.css$/,
                exclude: [root('src', 'app'), root('dist')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },

            // All css required in src/app files will be merged in js files
            {
                test: /\.css$/,
                include: root('src', 'app'),
                exclude: root('dist'),
                use: 'raw-loader!postcss-loader'
            },

            // Support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.(scss|sass)$/,
                exclude: [root('src', 'app', 'components'), root('dist')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            // all css required in src/app files will be merged in js files
            {
                test: /\.(scss|sass)$/,
                exclude: [root('src', 'app', 'style'), root('dist'), root('externals')],
                loader: 'raw-loader!postcss-loader!sass-loader'
            },

            // Support for .html as raw text
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: root('dist')
            },

            // Support for .js files as raw text
            {
                test: /\.js$/,
                use: 'raw-loader',
                include: root('libs'),
                exclude: root('dist')
            },

            // Support for pug/jade files
            {
                test: /\.(pug|jade)$/,
                use: 'pug-html-loader',
                exclude: root('dist')
            }
        ]
    };

    // tslint support
    config.module.rules.push({
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
    });

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src') // location of your src
        ),

        // Tslint configuration for webpack 2
        new webpack.LoaderOptionsPlugin({
            options: {
                /**
                 * Apply the tslint loader as pre/postLoader
                 * Reference: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
                /**
                 * Sass
                 * Reference: https://github.com/jtangelder/sass-loader
                 * Transforms .scss files to .css
                 */
                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },
                /**
                 * PostCSS
                 * Reference: https://github.com/postcss/autoprefixer-core
                 * Add vendor prefixes to your css
                 */
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        })
    ];

    config.plugins.push(
        // Generate common chunks if necessary
        // Reference: https://webpack.github.io/docs/code-splitting.html
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        // Inject script and link tags into html files
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: isProd ? './externals/index.html' : './externals/index-dev.html',
            chunksSortMode: 'dependency'
        }),
        // Inject all external js and css lib files into index.html
        new HtmlWebpackIncludeAssetsPlugin({
            assets: getFiles(root('externals/libs'), ['.js', '.css'], root('externals/libs')),
            //assets: ['jquery/dist/jquery.min.js', 'materialize/materialize.js'],
            publicPath: '/static/libs',
            append: true
        }),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({filename: 'css/[name].[hash].css'}),

        // Copy assets from the public folder and ignore source files
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: root('externals'),
            ignore: [
                '*.pug', '*.jade', '*.sass', '*.scss', '*.ts', '*.ttf', '*.eot', '*.woff', '*.woff2', 'index-dev.html'
            ]
        }])
    );

    if (!isProd) {
        config.plugins.push(
            new LiveReloadPlugin()
        )
    }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // // Dedupe modules in the output
            // new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: {keep_fnames: true}})
        );
    }

    return config;
}();

///// Helper functions \\\\\

/*
    Function to get an absolute path relative to the project root ('frontend' folder)
 */
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

/*
    Function to get all files in a certain directory that match one of the accepted_extensions
 */
function getFiles(dir, accepted_extensions, root_dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, accepted_extensions, root_dir, files_);
        } else {
            for (var j = 0; j < accepted_extensions.length; j++) {
                if (name.endsWith(accepted_extensions[j])) {
                    files_.push(name.replace(root_dir, ''));
                }
            }
        }
    }
    return files_;
}


///// Welcome message when running webpack \\\\\\

console.log('\n\n');
console.log(colors.underline(colors.red('Welcome to The First Real Angular 2 Boilerplate')));
console.log(colors.cyan('\nBundling libraries: '), colors.green(getFiles(root('externals/libs'), ['.js', '.css'], root('externals/libs'))));
console.log(colors.cyan('Production mode enabled: '), colors.green(isProd));
console.log('\n\n');