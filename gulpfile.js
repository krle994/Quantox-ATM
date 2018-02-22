const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile Sass

gulp.task('sass', function() {
    return gulp.src(['src/sass/*.sass'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// Watch & Serve

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/sass/*.sass'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/main.js").on('change', browserSync.reload);
});

// Default Task

gulp.task('default', ['serve']);
