const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  pug: {
    src: 'src/pug/**/*.pug',
    dest: 'dist'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/scripts/**/*.ts',
    dest: 'dist/js'
  }
};

// Pugタスク
function compilePug() {
  return gulp.src(paths.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest));
}

// Sassタスク
function compileSass() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

// TypeScriptタスク
function compileTs() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'main.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// 監視タスク
function watchFiles() {
  gulp.watch(paths.pug.src, compilePug);
  gulp.watch(paths.styles.src, compileSass);
  gulp.watch(paths.scripts.src, compileTs);
}

const build = gulp.series(gulp.parallel(compilePug, compileSass, compileTs), watchFiles);

exports.compilePug = compilePug;
exports.compileSass = compileSass;
exports.compileTs = compileTs;
exports.watch = watchFiles;
exports.default = build;
