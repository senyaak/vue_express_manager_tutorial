var gulp = require("gulp");
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var server = require("gulp-develop-server");
var path = require("path");

var tsConfServer = {
  target: "es6",
  module: "commonjs",
  moduleResolution: "node",
  noImplicitAny: true,
};
var globalTypes = [
  "typings/**/*.d.ts",
  "node_modules/@types/**/*.d.ts",
  "node_modules/@types/*.d.ts",
]

gulp.task("compile", ["clean"], function () {
  return gulp.src(globalTypes.concat([
    "src/**/*.ts",
    "src/*.ts",
  ]))
    .pipe(ts(tsConfServer))
    .js.pipe(gulp.dest("built/"));
});

gulp.task("watch", ["compile"], function () {
  server.listen({path: "./built/services/index.js"});
  gulp.watch(["./index.js"], server.restart);
  var watcher = gulp.watch(
    ["src/**/*", "src/**/*", "public/**/*"],
    {debounceDelay: 1500},
    ["server:restart"],
    server.restart
  );
  watcher.on("change", function (event) {
    console.log(`detected change in ${event.path}`);
  });
});

gulp.task("server:restart", ["default"], function () {
  server.restart(function () {});
});

gulp.task("clean", function () {
  return gulp.src("built", {read: false})
    .pipe(clean({force: true}));
});
