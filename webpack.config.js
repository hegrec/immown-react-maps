var path = require("path");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var proxy = require('http-proxy-middleware');
var sass = require("node-sass");
var shell = require("shelljs");
var Fs = require('fs');

function compileSCSS() {
  sass.render({
    file: "./scss/app.scss",
    outFile: "./build/app.css",
    sourceMap: true
  }, function (err, result) {
    if (err) {
      return console.error(err);
    }

    Fs.writeFile("./build/app.css", result.css, function(err) {

    });
  });
}

var sidebarProxy = proxy('/sidebar', {
  target: 'http://immown.dev',
  changeOrigin: true,
});

var iconsProxy = proxy('/icons', {
  target: 'http://immown.dev',
  changeOrigin: true,
});

module.exports = {
  entry: "./app/app.js",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    root: path.resolve(__dirname, "app")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      server: { baseDir: ['build'] },
      middleware: [iconsProxy, sidebarProxy],
      files: [
        "./build/app.css",
        "./build/index.html",
        "./build/img/**/*",
        {
          match: ["./scss/**/*.scss"],
          fn: function(event, file) {
            var index = file.indexOf(".scss");

            if (index > 0 && index === file.length - 5) {
              compileSCSS();
            }
          }
        },
        {
          match: ["./img/**/*"],
          fn: function(event, file) {
            shell.cp("-R", "./img", "./build/img");
          }
        },
        {
          match: "./index.html",
          fn: function(event, file) {
            shell.cp("./index.html", "./build/index.html");
          }
        }
      ]
    })
  ]
};
