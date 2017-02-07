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
var concat = require("gulp-concat");
var path = require("path");
var exists = require("path-exists").sync;
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

var dest = "dist";
var src = "src";
var paths = {
  src: "src",
  bower: {
    components: "bower_components",
    css: mainBowerFiles("**/*.css"),
    fonts: mainBowerFiles("**/fonts/**/*"),
    js: mainBowerFiles("**/*.js"),
    simpleIcons: mainBowerFiles("**/simple-icons/icons/*.svg")
  },
  copy: {
    dest: `${dest}`,
    src: [
      `${src}/{images,js/libraries}/**/*`,
      `${src}/*.html`,
      `${src}/manifest.json`
    ]
  },
  css: {
    dest: `${dest}/css`
  },
  fonts: {
    dest: `${dest}/fonts`
  },
  icons: {
    dest: `${dest}/images/simple-icons`
  },
  js: {
    dest: `${dest}/js`
  },
  less: {
    srcBuild: [`${src}/less/*.less`, `${src}/less/includes/base.less`],
    srcWatch: `${src}/less/**/*.less`
  },
  ts: {
    src: `${src}/ts/main/{main,popup,background}.ts`
  }
};


/** 
 * http://stackoverflow.com/questions/27100383/how-to-select-minified-dependencies-with-gulp-and-main-bower-files
 * https://gist.github.com/vincent-zurczak/424c5d136063c120ee18
 * Maybe include maps if they exist and then flatten this
 * Or just bundle them into vendors and do my own mapping and minifying #TODO
 */
var getMinFiles = (arr) => {
  return arr.map(function (path, index, arr) {
    var newPath = path.replace(/.([^.]+)$/g, ".min.$1");
    return exists(newPath) ? newPath : path;
  });
};

// Cleanup and then build (in parallel)
gulp.task("default", gulpSequence("cleanup", [
  "typescript", "less", "copy",
  "bower-js", "bower-css", "bower-fonts", "bower-icons"
]));

gulp.task("cleanup", function () {
  return del(dest);
});

gulp.task("typescript", function (done) {
  glob(paths.ts.src, function (err, files) {
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
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(uglify())
        .pipe(rename({
          extname: ".js"
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.js.dest));
    });

    es.merge(tasks).on("end", done);
  });
});

gulp.task("less", function () {
  return gulp.src(paths.less.srcBuild)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task("copy", function () {
  return gulp.src(paths.copy.src)
    .pipe(gulp.dest(paths.copy.dest));
});

gulp.task("bower-js", function () {
  return gulp.src(paths.bower.js)
    //.pipe(filter("**/*.js"))
    // doubles build time, no real reason for an extension
    //.pipe(sourcemaps.init())
    .pipe(concat("vendor.js"))
    //.pipe(uglify())
    //.pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task("bower-css", function () {
  gulp.src(paths.bower.css)
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task("bower-fonts", function () {
  return gulp.src(paths.bower.fonts)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task("bower-icons", function () {
  return gulp.src(paths.bower.simpleIcons)
    .pipe(gulp.dest(paths.icons.dest));
});

gulp.task("watch", ["default"], function () {

  // Basic copy of html
  gulp.watch(paths.copy.src, ["copy"]);

  // Typescript
  gulp.watch(paths.ts.src, ["typescript"]);

  // LESS
  gulp.watch(paths.less.srcWatch, ["less"]);

  // Bower JS
  gulp.watch(paths.bower.js, ["bower-js"]);

  // Bower CSS
  gulp.watch(paths.bower.css, ["bower-css"]);

  // Bower Fonts
  gulp.watch(paths.bower.fonts, ["bower-fonts"]);

});