var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var compass = require('gulp-compass');
var notify  = require('gulp-notify');


var paths = {
    scripts: {
        src:  'temp/js/*.js',
        dest: 'public/javascripts'
    },
    styles: {
        src:  'temp/css/*.scss',
        dest: 'public/stylesheets'
    }
};

// Magic / more magic
var development = false;

// Defaults are for production environment (development = false)
var compassDefaults = {
  css: paths.styles.dest,
  sass: 'temp/css',
  image: 'proto/assets/images',
  require: ['susy'],
  style: 'compressed'
}

gulp.task('styles', function () {
  if (development === true) {
    gulp.src('temp/css/main.scss')
      .pipe(compass( compassDefaults ))
      .pipe(notify({ message: 'Styles task complete- DEVELOPMENT' }));

  } else {
    // Override defaults, so output is trimmed down
    compassDefaults['sourcemap'] = true;
    compassDefaults['style'] = 'nested';
    compassDefaults['compass'] = false;

    gulp.src('temp/css/main.scss')
      .pipe(compass( compassDefaults ))
      .pipe(notify({ message: 'Styles task complete - PRODUCTION' }));
  }
});

// Scripts task
gulp.task('scripts', function () {
  if (development === true) {
    gulp.src(paths.scripts.src)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(notify( { message: 'We now have scripts (DEVELOPMENT)' } ));

  } else {
    gulp.src(paths.scripts.src)
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(notify( { message: 'We now have scripts (PRODUCTION)' } ));
  }
});

// Watches files for modifications and reloads
gulp.task('watch', function() {
  gulp.watch(paths.styles.src, ['styles']);
  gulp.watch(paths.scripts.src, ['scripts']);
});

// Defaults
gulp.task('default', ['styles', 'scripts']);
