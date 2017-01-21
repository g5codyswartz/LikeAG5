/**
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn
 * https://www.typescriptlang.org/docs/handbook/gulp.html
 * https://ilikekillnerds.com/2014/07/copying-files-from-one-folder-to-another-in-gulp-js/
 * http://stackoverflow.com/questions/25038014/how-do-i-copy-directories-recursively-with-gulp
 * http://stackoverflow.com/questions/27671390/why-inline-source-maps
 * http://andy-carter.com/blog/a-beginners-guide-to-package-manager-bower-and-using-gulp-to-manage-components
 */

var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");
var del = require("del");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var less = require("gulp-less");
var sourcemaps = require("gulp-sourcemaps");
var dest = "./dist";
var src = "./src";

// Cleanup and then build (in parallel)
gulp.task("default", gulpSequence("cleanup", ["typescript", "less", "copy"]));

gulp.task("cleanup", function () {
  return del(`${dest}`);
});

gulp.task("typescript", function () {
  /*
  return browserify({
    basedir: ".",
    debug: true,
    entries: [`${src}/js/main/main.ts`],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(dest));
*/

  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${dest}/js`));
    
});

gulp.task("less", function () {
  return gulp.src(`${src}/less/*.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${dest}/css`));
});

gulp.task("copy", function () {
  return gulp.src([
    `${src}/{fonts,images,js/libraries}/**/*`,
    `${src}/*.html`,
    `${src}/manifest.json`
  ])
    .pipe(gulp.dest(`${dest}`));
});
