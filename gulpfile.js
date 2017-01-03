var path = require("path");
var gulp = require("gulp");
var clean = require('gulp-clean');
var flatten = require('gulp-flatten')
var concat = require('gulp-concat')
var typescript = require("gulp-typescript");
var less = require("gulp-less");
var tsconfig = require('./tsconfig.json');
var glob = require("glob");
var fs = require("fs");

const libs = "lib.source";
const exportedLibs = "lib";
const src = path.join(__dirname,"/source");
const dist = path.join(__dirname,"/dist");


gulp.task("default", ["clean-sync"]);
gulp.task("clean-sync", ["clean"], function() {
  gulp.start("concat-sync");
});
gulp.task("concat-sync", ["concat"], function() {
  gulp.start("set-exported-sync");
});
gulp.task("set-exported-sync", ["set-exported"], function() {
  gulp.start("typescript");
});

gulp.task("clean", function() { //delete old files
  return gulp.src(path.join(dist))
    .pipe(clean())
  ;
});
gulp.task("concat", function() { //concat typescript
  return gulp.src(path.join(src, "/ts/*.ts"))
    .pipe(concat(libs + ".ts"))
    .pipe(gulp.dest(path.join(dist)))
  ;
});
gulp.task("set-exported", function() { //add export { ... };
  var list = require(path.join(src, "/export.json"));
  var exportList = "\nexport { ";
  for(let module of list) {
    exportList += module + ", ";
  }
  exportList = exportList.substr(0, exportList.length - 2);
  exportList += " };";

  exportList = fs.readFileSync(path.join(dist, libs + ".ts")) + exportList;

  return fs.writeFile(path.join(dist, exportedLibs + ".ts"), exportList, function(err) {});
});
gulp.task("typescript", function() { //compile typescript
  return gulp.src(path.join(dist, "/*.ts"))
    .pipe(typescript(tsconfig.compilerOptions))
    .pipe(gulp.dest(path.join(dist)))
  ;
});