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
    plumber      = require('gulp-plumber');

var target = {
    sass_src: 'src/sass/*.scss',
    css_dest: 'builds/css',
    js_src:   'src/js/**.js',
    js_dest:  'builds/js'
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
        .pipe(notify({message: 'SCSS processed!'}));
});

gulp.task('js', function() {
    return gulp.src(target.js_src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(target.js_dest))
        .pipe(notify({message: 'JS processed!'}));
});

gulp.task('watch', function() {
    gulp.watch(target.sass_src, ['sass']);
    gulp.watch(target.js_src, ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);
