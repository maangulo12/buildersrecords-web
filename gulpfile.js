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
    runSequence  = require('run-sequence'),
    ngAnnotate   = require('gulp-ng-annotate'),
    karma        = require('karma'),
    jsdoc        = require('gulp-jsdoc'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

var target = {
    sass_src: 'scss/*.scss',
    css_dest: 'www/css',
    js_src:   [
        'src/*.module.js',
        'src/*.js',
        'src/**/*.module.js',
        'src/**/*.js'
    ],
    js_vendor_src: [
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
    js_dest: 'www/js',
    js_markdown_dest: 'doc/markdown'
};

gulp.task('sass', function() {
    return gulp.src(target.sass_src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(target.css_dest))
        .pipe(notify({ message: 'SCSS processed!' }));
});

gulp.task('js', function() {
    return gulp.src(target.js_src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate({ add: true }))
        //.pipe(uglify({ mangle: true }))
        .pipe(gulp.dest(target.js_dest))
        .pipe(notify({ message: 'JS processed!' }));
});

gulp.task('js-vendor', function() {
    return gulp.src(target.js_vendor_src)
        .pipe(plumber())
        //.pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(target.js_dest))
        .pipe(notify({ message: 'Vendor processed!' }));
});

gulp.task('js-doc', function() {
    return gulp.src(target.js_src)
        .pipe(plumber())
        .pipe(jsdoc())
        .pipe(notify({ message: 'Doc processed!' }));
});

gulp.task('js-markdown', function() {
    return gulp.src(target.js_src)
        .pipe(plumber())
        .pipe(gulpJsdoc2md())
        .pipe(rename({ extname: '.md' }))
        .pipe(gulp.dest(target.js_markdown_dest))
        .pipe(notify({ message: 'Markdown processed!' }));
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

gulp.task('watch', function() {
    gulp.watch(target.sass_src, ['sass']);
    gulp.watch(target.js_src, ['js', 'js-doc', 'js-markdown', 'test']);
    gulp.watch(target.js_vendor_src, ['js-vendor']);
});

gulp.task('default', ['sass', 'js', 'js-vendor', 'js-doc', 'js-markdown', 'tdd', 'watch']);
