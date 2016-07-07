'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');

var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var uglify       = require('gulp-uglify');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var ngAnnotate   = require('gulp-ng-annotate');
var karma        = require('karma');
var gulpDocs     = require('gulp-ngdocs');

var target = {
  srcSass: 'sass/*.scss',
  srcCss: 'sass/*.min.css',
  srcBootstrapCss: 'bower_components/bootswatch/flatly/bootstrap.min.css',
  finalCss: 'www/css',

  jsSrc:   [
    'src/*.module.js',
    'src/*.js',
    'src/**/*.module.js',
    'src/**/*.js',
    '!src/**/*.spec.js'
  ],
  jsVendorSrc: [
    'vendor/jquery/jquery-1.11.3.min.js',
    'vendor/bootstrap/bootstrap.min.js',
    'vendor/angularjs/1.4.5/angular.min.js',
    'vendor/angularjs/1.4.5/angular-messages.min.js',
    'vendor/angular-ui/validate.min.js',
    'vendor/angular-ui/angular-ui-router.min.js',
    'vendor/angular-jwt/angular-jwt.min.js',
    'vendor/angular-storage/angular-storage.min.js',
    'vendor/smart-table/smart-table.min.js',
    'vendor/highcharts/highcharts.min.js'
  ],
  jsTestsSrc: 'src/**/*.spec.js',
  jsDest: 'www/js',
  jsDocsDest: 'docs'
};

// Converts SASS -> CSS, autoprefixes CSS, and minifies CSS
gulp.task('sass', function () {
  return gulp.src(target.srcSass)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('sass'));
});

// Concats all CSS files
gulp.task('css-concat', function () {
  return gulp.src([target.srcBootstrapCss, target.srcCss])
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(target.finalCss));
});

// gulp.task('js', function() {
//     return gulp.src(target.jsSrc)
//         .pipe(plumber())
//         .pipe(jshint())
//         .pipe(jshint.reporter(stylish))
//         .pipe(concat('app.min.js'))
//         //.pipe(ngAnnotate({ add: true }))
//         //.pipe(uglify({ mangle: true }))
//         .pipe(gulp.dest(target.jsDest))
//         .pipe(notify({ message: 'JS processed!' }));
// });
//
// gulp.task('js-vendor', function() {
//     return gulp.src(target.jsVendorSrc)
//         .pipe(plumber())
//         //.pipe(uglify())
//         .pipe(concat('vendor.min.js'))
//         .pipe(gulp.dest(target.jsDest))
//         .pipe(notify({ message: 'JS Vendor processed!' }));
// });
//
// gulp.task('js-docs', function() {
//     return gulp.src(target.jsSrc)
//         .pipe(plumber())
//         .pipe(gulpDocs.process())
//         .pipe(gulp.dest(target.jsDocsDest))
//         .pipe(notify({ message: 'JS Docs processed!' }));
// });
//
// gulp.task('test', function(done) {
//     var Server = karma.Server;
//     new Server({
//         configFile: __dirname + '/karma.conf.js',
//         singleRun: true
//     }, done).start();
// });
//
// gulp.task('tdd', function(done) {
//     var Server = karma.Server;
//     new Server({
//         configFile: __dirname + '/karma.conf.js'
//     }, done).start();
// });
//
// gulp.task('lint-tests', function(done) {
//     return gulp.src(target.jsTestsSrc)
//         .pipe(plumber())
//         .pipe(jshint())
//         .pipe(jshint.reporter(stylish))
//         .pipe(notify({ message: 'Tests linted!' }));
// });
//
gulp.task('watch', function() {
  gulp.watch(target.srcSass, ['sass', 'css-concat']);
  // gulp.watch(target.jsSrc, ['js', 'js-docs', 'test']);
  // gulp.watch(target.jsVendorSrc, ['js-vendor']);
  // gulp.watch(target.jsTestsSrc, ['lint-tests']);
});

gulp.task('default', ['sass', 'css-concat', 'watch']);

// gulp.task('default', ['sass', 'js', 'js-vendor', 'js-docs', 'lint-tests', 'tdd', 'watch']);
