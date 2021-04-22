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
