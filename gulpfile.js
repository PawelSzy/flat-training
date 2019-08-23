'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');

const server = browserSync.create();

function reload(done) {
    server.reload();
    if (typeof done === "function") {
        done();
    }
}

function serve(done) {
    server.init({
        server: {
            baseDir: './'
        }
    });
    done();
}

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', gulp.series('sass', reload));
    gulp.watch('*.html').on('change', reload);
});

gulp.task('default',  gulp.series('sass', serve, 'watch'));
