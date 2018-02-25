const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('css', function() {
  return gulp.src('src/scss/ethmsg.scss')
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('deps', () => {
  return gulp.src([
    'node_modules/web3/dist/web3.min.js',
    'node_modules/identicon.js/identicon.js',
    ])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
  return gulp.src('src/images/*.{gif,jpg,svg,png}')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('js', () => {
  return gulp.src([
    'node_modules/page/page.js',
    'src/js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('ethmsg.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', () => {
    gulp.src([
        'src/templates/index.html'
    ])
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', [ 'css', 'deps', 'js', 'images', 'html' ]);