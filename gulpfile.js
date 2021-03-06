/**
 * https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps--fn
 * https://www.typescriptlang.org/docs/handbook/gulp.html
 * https://ilikekillnerds.com/2014/07/copying-files-from-one-folder-to-another-in-gulp-js/
 * http://stackoverflow.com/questions/25038014/how-do-i-copy-directories-recursively-with-gulp
 * http://stackoverflow.com/questions/27671390/why-inline-source-maps
 * http://andy-carter.com/blog/a-beginners-guide-to-package-manager-bower-and-using-gulp-to-manage-components
 * https://fettblog.eu/gulp-browserify-multiple-bundles/
 */

var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");
var rename = require("gulp-rename");
var del = require("del");
var path = require("path");
var es = require("event-stream");
var glob = require("glob");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var sourcemaps = require("gulp-sourcemaps");
var mainBowerFiles = require("main-bower-files");
// Unused so far, but useful
var watchify = require("watchify"); // live reload could be an altenative
var filter = require("gulp-filter");
var concat = require("gulp-concat");

var dest = "./dist";
var src = "./src";

// Cleanup and then build (in parallel)
gulp.task("default", gulpSequence("cleanup", ["typescript", "less", "copy", "bower-js", "bower-css"]));

gulp.task("cleanup", function () {
  return del(`${dest}`);
});

gulp.task("typescript", function (done) {
  glob(`${src}/js/main/{main,popup,background}.ts`, function (err, files) {
    if (err) done(err);

    var tasks = files.map(function (entry) {
      //console.log("ENTRY", entry);
      var filename = path.basename(entry);
      return browserify({
        basedir: ".",
        debug: true,
        entries: [entry],
        cache: {},
        packageCache: {}
      })
        .plugin(tsify)
        .bundle()
        .pipe(source(filename))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(rename({
          extname: ".js"
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(`${dest}/js`));
    });

    es.merge(tasks).on("end", done);
  });
});

gulp.task("less", function () {
  return gulp.src(`${src}/less/*.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write("./"))
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


gulp.task("bower-js", function () {
  gulp.src(mainBowerFiles("**/*.js"))
    //.pipe(filter("**/*.js"))
    // doubles build time, no real reason for an extension
    //.pipe(sourcemaps.init())
    //.pipe(concat("test.js"))
    //.pipe(uglify())
    //.pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(`${dest}/js/libs`));
});

gulp.task("bower-css", function () {
  gulp.src(mainBowerFiles("**/*.css"))
    .pipe(gulp.dest(`${dest}/css/libs`));
});