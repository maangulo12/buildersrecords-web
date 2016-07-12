'use strict';

// devDependencies
var gulp         = require('gulp');
var clean        = require('gulp-clean');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var uglify       = require('gulp-uglify');
var runSequence  = require('run-sequence');

var ngAnnotate   = require('gulp-ng-annotate');
var karma        = require('karma');
var gulpDocs     = require('gulp-ngdocs');

var bases = {
  src:  'src/',
  dist: 'dist/'
};

var paths = {
  sass: 'sass/*.scss',
  cssAll: [
    'bower_components/bootswatch/flatly/bootstrap.min.css',
    'dist/css/*.min.css'
  ],
  // JS
  srcJs: [
    'app/*.module.js',
    'app/*.js',
    'app/**/*.module.js',
    'app/**/*.js',
    '!app/**/*.spec.js'
  ],
  srcJsAll: [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-ui-validate/dist/validate.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-jwt/dist/angular-jwt.min.js',
    'bower_components/a0-angular-storage/dist/angular-storage.min.js',
    'bower_components/angular-smart-table/dist/smart-table.min.js',
    'bower_components/highcharts/highcharts.js',
    'www/js/app.min.js'
  ],
  // HTML
  srcHtml: [
    'app/*.html',
    'app/**/*.html'
  ],
  // Tests
  srcTests: 'app/**/*.spec.js',
  // Docs
  jsDocsDest: 'docs'
};

// Delete the dist directory
gulp.task('clean', function () {
  return gulp.src(bases.dist)
    .pipe(clean());
});

// Compile SASS, autoprefix, and minify CSS files
gulp.task('sass', ['clean'], function () {
  return gulp.src(paths.sass, {cwd: bases.src})
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(bases.dist + 'css/'));
});

// Concat all CSS files
gulp.task('css-concat', function () {
  return gulp.src(paths.cssAll)
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('www/css'));
});

// JSHint, concat, and minify JS files
gulp.task('js', function () {
  return gulp.src(target.srcJs)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('www/js'));
});

// Concat all JS files
gulp.task('js-concat', function () {
  return gulp.src(target.srcJsAll)
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('www/js'));
});

// Copy HTML templates
gulp.task('html', function () {
  return gulp.src(target.srcHtml)
    .pipe(gulp.dest('www/html'));
});

// Build task for CSS
gulp.task('build-css', function () {
  return runSequence('sass', 'css-concat', function () {
    console.log('CSS is ready!');
  });
});

// Build task for JS
gulp.task('build-js', function () {
  return runSequence('js', 'js-concat', function () {
    console.log('JS is ready!');
  });
});

// gulp.task('js-docs', function() {
//     return gulp.src(target.jsSrc)
//         .pipe(plumber())
//         .pipe(gulpDocs.process())
//         .pipe(gulp.dest(target.jsDocsDest))
//         .pipe(notify({ message: 'JS Docs processed!' }));
// });
//
// gulp.task('test', function (done) {
//     var Server = karma.Server;
//     new Server({
//         configFile: __dirname + '/karma.conf.js',
//         singleRun: true
//     }, done).start();
// });
//
// gulp.task('tdd', function (done) {
//     var Server = karma.Server;
//     new Server({
//         configFile: __dirname + '/karma.conf.js'
//     }, done).start();
// });
//
// gulp.task('lint-tests', function (done) {
//     return gulp.src(target.jsTestsSrc)
//         .pipe(plumber())
//         .pipe(jshint())
//         .pipe(jshint.reporter(stylish))
//         .pipe(notify({ message: 'Tests linted!' }));
// });

// Watch task
gulp.task('watch', function () {
  gulp.watch(target.srcSass, ['build-css']);
  gulp.watch(target.srcJs, ['build-js']);
  gulp.watch(target.srcHtml, ['html']);
  // gulp.watch(target.jsTestsSrc, ['lint-tests']);
});

gulp.task('default', ['build-css', 'build-js', 'html', 'watch']);

// gulp.task('default', ['sass', 'js', 'js-vendor', 'js-docs', 'lint-tests', 'tdd', 'watch']);
