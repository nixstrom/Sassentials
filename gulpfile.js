var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var compass = require('gulp-compass');
var notify  = require('gulp-notify');

var browserify = require('gulp-browserify');
var rename = require('gulp-rename');


var paths = {
    scripts: {
        src:  'assets/js/*.js',
        dest: 'public/javascripts'
    },
    coffee: {
      src:  'assets/js/coffee/**/*.coffee',
      dest: 'assets/js'
    },
    styles: {
        src:  'assets/sass/*.scss',
        dest: 'public/stylesheets'
    }
};

// Magic / more magic
var development = true;

// Defaults are for production environment (development = false)
var compassDefaults = {
  css: paths.styles.dest,
  sass: 'assets/sass',
  image: 'assets/images',
  require: ['susy', 'breakpoint'],
  style: 'compressed'
}

gulp.task('styles', function () {
  if (development === true) {
    gulp.src('assets/sass/main.scss')
      .pipe(compass( compassDefaults ))
      .pipe(notify({ message: 'Styles (DEV) task complete. \n Saved to ' + paths.styles.dest }));

  } else {
    // Override defaults, so output is trimmed down
    compassDefaults['sourcemap'] = true;
    compassDefaults['style'] = 'nested';
    compassDefaults['compass'] = false;

    gulp.src('temp/css/main.scss')
      .pipe(compass( compassDefaults ))
      .pipe(notify({ message: 'Styles task complete. \n Saved to ' + paths.styles.dest }));
  }
});

gulp.task('coffee', function() {
  gulp.src('assets/js/coffee/app.coffee', { read: false })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./public/javascripts'))
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
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch(paths.coffee.src, ['coffee', 'scripts']);
  gulp.watch(paths.scripts.src, ['scripts']);
});

// Defaults
gulp.task('default', ['styles', 'scripts']);
