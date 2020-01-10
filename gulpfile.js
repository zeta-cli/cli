var gulp = require('gulp');
var del = require('del');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

var paths = {
  dist: 'dist',
  scripts: {
    bin: 'bin/**/*.js',
    src: 'src/**/*.js',
    dist: 'dist'
  }
};

function clean() {
  return del([paths.dist]);
}

function ofuscate() {
  return gulp.src([paths.scripts.src])
    .pipe(javascriptObfuscator({
      compact: true,
      target: 'node',
      reservedNames: ['exports'],
      reservedStrings: ['exports'],
    }))
    .pipe(gulp.dest(`${paths.scripts.dist}/src`));
}

function bin() {
  return gulp.src([paths.scripts.bin])
    .pipe(gulp.dest(`${paths.scripts.dist}/bin`));
}

var build = gulp.series(clean, ofuscate, bin);

exports.clean = clean;
exports.default = build;
