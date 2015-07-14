/*
 * Gulpfile
 *
 */


/*
 * Gulp Config
 */
var
  gulp         = require('gulp'),
  gutil        = require('gulp-util'),
  markdown     = require('gulp-markdown-to-json'),
  jade         = require('gulp-jade'),
  less         = require('gulp-less'),
  bless        = require('gulp-bless'),
  minifycss    = require('gulp-minify-css'),
  naturalsort  = require('gulp-natural-sort'),
  fileinclude  = require('gulp-file-include'),
  order        = require('gulp-order'),
  pxtorem      = require('gulp-pxtorem'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  rename       = require('gulp-rename'),
  sourcemaps   = require('gulp-sourcemaps'),
  path         = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  livereload   = require('gulp-livereload');

var paths = {
  bower:       'bower_components',
  destination: 'public',
  posts:       'posts',
  projects:    'projects',
  source:      'src',
  views:       'src/views',
  components:  'src/components',
  config:      'config'
}


/*
 * Compile stylesheets
 */
gulp.task('css', ['css:compile', 'css:minify']);

gulp.task('css:compile', function() {
  return gulp
    .src(paths.source + '/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(pxtorem())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.destination + '/css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});


/*
 * Minify stylesheets
 */
gulp.task('css:minify', ['css:compile'], function() {
  return gulp
    .src(paths.destination + '/css/styles.css')
    .pipe(minifycss())
    .pipe(rename(function (path) {
      if(path.extname === '.css') {
        path.basename += '.min';
      }
    }))
    .pipe(bless())
    .pipe(gulp.dest(paths.destination + '/css'))
    .pipe(notify({ message: 'Successfully minified CSS' }));
});


/*
 * Compile javascript
 */
gulp.task('js', function() {
  var scripts = [
    paths.bower  + '/zepto/zepto.js',
    paths.bower  + '/zepto-detect/index.js',
    paths.bower  + '/zepto-scroll/static/zepto.scroll.js',
    paths.bower  + '/momentjs/moment.js',
    paths.bower  + '/riot/riot+compiler.js',
    paths.bower  + '/prism/prism.js',
    paths.source + '/js/main.js'
  ];

  return gulp
    .src(scripts)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.destination + '/js'))
    .pipe(uglify({ outSourceMap: true }))
    .pipe(rename(function (path) {
      if(path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(paths.destination + '/js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});


/*
 * Templates
 */
gulp.task('templates', function() {
  return gulp
    .src(paths.views + '/*.jade')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.views
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.destination));
});


/*
 * Components
 */
gulp.task('components', function() {
  return gulp
  .src(paths.components + '/**/*.tag')
  .pipe(gulp.dest(paths.destination + '/components'))
});


/*
 * Projects
 */
gulp.task('projects', function() {
  return gulp
    .src(paths.projects + '/*.md')
    .pipe(gutil.buffer())
    .pipe(markdown('projects.json'))
    .pipe(gulp.dest(paths.destination + '/json'));
});


/*
 * Favicons
 */
gulp.task('favicons', function() {
  return gulp
    .src(paths.source + '/ico/*')
    .pipe(gulp.dest(paths.destination + '/ico'))
});


/*
 * Config
 */
gulp.task('config', function() {
  return gulp
    .src(paths.config + '/.htaccess')
    .pipe(gulp.dest(paths.destination))
});


/*
 * Cleanup
 */
gulp.task('rimraf', function() {
  return gulp
    .src([
      paths.destination
    ], {read: false})
    .pipe(rimraf());
});


/*
 * Default
 */
gulp.task('default', ['rimraf'], function() {
  return gulp.start('css', 'js', 'templates', 'projects', 'components', 'favicons', 'config');
});


/*
 * Watch
 */
gulp.task('watch', function() {
  // Watch .less files
  gulp.watch(paths.source + '/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch(paths.source + '/js/**/*.js', ['js']);

  // Watch .jade files
  gulp.watch(paths.views + '/**/*.jade', ['templates']);

  // Watch content
  gulp.watch(paths.projects + '/**/*.md',  ['projects']);

  // Watch riot .tag files
  gulp.watch(paths.source + '/components/**/*.tag',  ['components']);

  // Livereload
  livereload.listen();
  gulp.watch(paths.destination + '/**/*').on('change', livereload.changed);
});
