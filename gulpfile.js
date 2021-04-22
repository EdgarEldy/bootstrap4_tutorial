//Initialize packages
"use strict";
const { src, dest, watch, series, parallel } = require("gulp");
const colors = require("ansi-colors");
const browserSync = require("browser-sync").create();
const del = require("del");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const prettyHtml = require("gulp-pretty-html");
const htmllint = require("gulp-htmllint");
const jshint = require("gulp-jshint");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const chalk = require("chalk");
const log = console.log;

//Starting development tasks

//Compile HTML files using panini
function compileHTML() {
  log(
    chalk.red.bold("---------------COMPILING HTML WITH PANINI---------------")
  );
  panini.refresh();
  return src("src/pages/**/*.html")
    .pipe(
      panini({
        root: "src/pages/",
        layouts: "src/layouts/",
        partials: "src/partials/",
        helpers: "src/helpers/",
        data: "src/data/",
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

//Reset panini cache
function resetPages(done) {
  log(chalk.red.bold("---------------CLEARING PANINI CACHE---------------"));
  panini.refresh();
  done();
}

//Copy css files from src/assets/css to dist/assets/css
function copyCSS() {
  log(chalk.red.bold("---------------COPY CSS FILES INTO DIST---------------"));
  return src(["src/assets/css/*"])
    .pipe(dest("dist/assets/css"))
    .pipe(browserSync.stream());
}

//Copy js files from src/assets/js to dist/assets/js
function copyJS() {
  log(chalk.red.bold("---------------COMPILE CUSTOM.JS---------------"));
  return src(["src/assets/js/**/*.js"])
    .pipe(babel())
    .pipe(dest("dist/assets/js/"))
    .pipe(browserSync.stream());
}

//Detects inconsistent html tags
function htmlLint() {
  log(chalk.red.bold("---------------HTML LINTING---------------"));
  return src("dist/**/*.html").pipe(htmllint({}, htmllintReporter));
}
