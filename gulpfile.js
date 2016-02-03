'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano      = require('gulp-cssnano'),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    ngAnnotate   = require('gulp-ng-annotate'),
    karma        = require('karma'),
    gulpDocs     = require('gulp-ngdocs');

var target = {
    scssSrc: 'scss/*.scss',
    cssDest: 'www/css',
    jsSrc:   [
        'src/*.module.js',
        'src/*.js',
        'src/**/*.module.js',
        'src/**/*.js'
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
    jsTestsSrc: 'tests/**/*.spec.js',
    jsDest:     'www/js',
    jsDocsDest: 'docs'
};

gulp.task('scss', function() {
    return gulp.src(target.scssSrc)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(target.cssDest))
        .pipe(notify({ message: 'SCSS processed!' }));
});

gulp.task('js', function() {
    return gulp.src(target.jsSrc)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('app.min.js'))
        //.pipe(ngAnnotate({ add: true }))
        //.pipe(uglify({ mangle: true }))
        .pipe(gulp.dest(target.jsDest))
        .pipe(notify({ message: 'JS processed!' }));
});

gulp.task('js-vendor', function() {
    return gulp.src(target.jsVendorSrc)
        .pipe(plumber())
        //.pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(target.jsDest))
        .pipe(notify({ message: 'JS Vendor processed!' }));
});

gulp.task('js-docs', function() {
    return gulp.src(target.jsSrc)
        .pipe(plumber())
        .pipe(gulpDocs.process())
        .pipe(gulp.dest(target.jsDocsDest))
        .pipe(notify({ message: 'JS Docs processed!' }));
});

gulp.task('test', function(done) {
    var Server = karma.Server;
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function(done) {
    var Server = karma.Server;
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('lint-tests', function(done) {
    return gulp.src(target.jsTestsSrc)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(notify({ message: 'Tests linted!' }));
});

gulp.task('watch', function() {
    gulp.watch(target.scssSrc, ['scss']);
    gulp.watch(target.jsSrc, ['js', 'js-docs', 'test']);
    gulp.watch(target.jsVendorSrc, ['js-vendor']);
    gulp.watch(target.jsTestsSrc, ['lint-tests']);
});

gulp.task('default', ['scss', 'js', 'js-vendor', 'js-docs', 'lint-tests', 'tdd', 'watch']);
