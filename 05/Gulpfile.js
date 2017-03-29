'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat');
var clean = require('gulp-clean');


gulp.task('webpack', [], function() {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('cssmin', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/build/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/build/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('cssconcat', function () {
    return gulp.src('dist/build/**/*.css')
        .pipe(concatCss("./bundle.css"))
        .pipe(gulp.dest('dist/build/'));
});

gulp.task('clean-resources', function () {
    return gulp.src('dist/build/*.css', {read: false})
        .pipe(clean());
});

var path = {
    HTML: 'src/index.html',
    ALL: ['src/**/*.jsx', 'src/**/*.js', 'src/**/*.css', 'src/**/*.scss'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};

gulp.task('watch', function() {
    gulp.watch(path.ALL, ['clean-resources', 'sass', 'cssmin', 'cssconcat', 'webpack']);
});


gulp.task('default', ['clean-resources', 'sass', 'cssmin', 'cssconcat', 'webpack-dev-server', 'webpack', 'watch']);
