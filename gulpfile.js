const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

// clean dist
function cleanOut() {
  return src('output/')
    .pipe(clean())
}

// rename file
function renameOut() {
  return src('server/**/*.js')
    .pipe(rename({ extname: '.ts' }))
    .pipe(dest('output/'));
}


exports.default = series(cleanOut, renameOut);