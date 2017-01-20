var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("default", function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write(
        "/js/main", {
          includeContent: false,
          sourceRoot: "/js/main"
        }))
  .pipe(gulp.dest("dist"));
});