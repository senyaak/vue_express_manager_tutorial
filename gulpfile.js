var gulp = require("gulp");
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var server = require("gulp-develop-server");
var path = require("path");

var tsConfServer = {
  target: "es2015",
  module: "commonjs",
  moduleResolution: "node",
  noImplicitAny: false,
};
var globalTypes = [
  "typings/**/*.d.ts",
  "node_modules/@types/**/*.d.ts",
  "node_modules/@types/*.d.ts",
]

gulp.task("default", ["compile"], () => {
});

gulp.task("compile", ["clean"], function () {
  return gulp.src(globalTypes.concat([
    "src/**/*.ts",
    "src/*.ts",
  ]))
    .pipe(ts(tsConfServer))
    .js.pipe(gulp.dest("build/"));
});

gulp.task("watch", ["compile"], function () {
  server.listen({path: "./build/services/BudgetManagerAPI/index.js"});
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
  return gulp.src("build", {read: false})
    .pipe(clean({force: true}));
});
