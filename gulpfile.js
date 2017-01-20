/**
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn
 * https://www.typescriptlang.org/docs/handbook/gulp.html
 * https://ilikekillnerds.com/2014/07/copying-files-from-one-folder-to-another-in-gulp-js/
 */

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var less = require("gulp-less");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["typescript", "less", "fonts", "images", "html"]);

gulp.task("typescript", function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write(
      "./dist/js", {
        includeContent: false,
        sourceRoot: "/js"
      }))
    .pipe(gulp.dest("dist"));
});

gulp.task("less", function() {
  return gulp.src("./src/less/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write(
      "./dist/css", {
        includeContent: false,
        sourceRoot: "/css"
      }
    ))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("fonts", function(){

});

gulp.task("images", function(){

});

gulp.task("html", function(){

});
