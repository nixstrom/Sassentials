var gulp    = require('gulp');

// For Markup
var haml = require('gulp-haml');

// For CSS
var sass       = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer') ;

// For JS
var uglify  = require('gulp-uglify');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

// For I/O
var concat  = require('gulp-concat');
var notify  = require('gulp-notify');


var paths = {
    markup: {
        src:  'markup/haml/*.haml',
        dest: 'markup/html'
    },
    scripts: {
        src:  'assets/js/*.js',
        dest: 'public/javascripts'
    },
    styles: {
        src:  'assets/sass/*.scss',
        dest: 'public/stylesheets'
    }
};

// Magic / more magic
var development = true;

// Get and render all .haml files recursively
gulp.task('markup', function () {
  gulp.src( paths.markup.src )
    .pipe(haml())
    .pipe(gulp.dest( paths.markup.dest ))
    .pipe(notify({ message: 'Markup task complete. \n Saved to ' + paths.markup.dest }));
});

// Defaults are for production environment (development = false)
var sassDefaults = {
  require: ['susy', 'breakpoint'],
  sourcemap: false,
  'sourcemap=none': true,
  style: "nested"
}

gulp.task('styles', function () {
  if (development === true) {
    gulp.src('assets/sass/main.scss')
      .pipe(sass( sassDefaults ))
      .pipe(autoprefix('last 2 version'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(notify({ message: 'Styles (DEV) task complete. \n Saved to ' + paths.styles.dest }));
  } else {
    // Override defaults, so output is trimmed down
		sassDefaults['style'] = "compressed";

    gulp.src('temp/css/main.scss')
      .pipe(sass( sassDefaults ))
      .pipe(notify({ message: 'Styles task complete. \n Saved to ' + paths.styles.dest }));
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
  gulp.watch(paths.markup.src, ['markup']);
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch(paths.scripts.src, ['scripts']);
});

// Defaults
gulp.task('default', ['markup', 'styles', 'scripts']);
