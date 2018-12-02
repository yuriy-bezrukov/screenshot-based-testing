let gulp = require('gulp');

let tsc = require('gulp-typescript');

let less = require('gulp-less');
let LessAutoprefix = require('less-plugin-autoprefix');
let autoprefix = new LessAutoprefix({ browsers: ['last 5 versions'] });

let concat = require('gulp-concat');

let gulpCopy = require('gulp-copy');
let del = require('del');



gulp.task('typescript', function () {
  return gulp.src('./Scripts/*.ts')
    .pipe(tsc({
      noImplicitAny: true,
      removeComments: true,
      preserveConstEnums: true,
      sourceMap: true,
      target: "ES5"
    }))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('less', function () {
  return gulp.src("./Styles/*.less")
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./Styles'));
});



gulp.task('watcher', function () {
  gulp.watch('./Styles/*.less', ['less']);
  gulp.watch('./Scripts/*.ts', ['typescript']);
});

gulp.task('default', ['typescript', 'less']);
gulp.task('deploy', ['typescript', 'less', 'vendors', 'copyHtml', 'copyCss', 'copyJs']);


gulp.task('copyJs', function () {
  return gulp.src('./Scripts/*.js')
    .pipe(gulp.dest('./deploy/Scripts'));
});

gulp.task('copyCss', function () {
  return gulp.src('./Styles/*.css')
    .pipe(gulp.dest('./deploy/Styles'));
});

gulp.task('copyHtml', function () {
  return gulp.src('./*.html')
    .pipe(gulp.dest('./deploy'));
});

gulp.task('vendors', function () {
  return gulp.src([
    "./node_modules/jquery/dist/jquery.min.js"
  ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./Scripts'));
});

gulp.task('screenshotBasedTests', function () {
  return gulp.src('./backstop_data/**/*.*')
    .pipe(gulp.dest('./deploy/backstop_data'));
});


gulp.task('clean', function () {
  return del('./deploy/**', { force: true });
});

