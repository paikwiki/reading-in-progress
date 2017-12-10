import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import Cache from 'gulp-file-cache';
import rename from 'gulp-rename';
import nodemon from 'gulp-nodemon';
import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';
import browserSync from 'browser-sync';
import jest from 'gulp-jest';

let cache = new Cache();

const DIR = {
  SRC: 'src',
  DEST: 'dist',
  TEST: '__tests__',
};

const SRC = {
  JS: DIR.SRC + '/js/*.js',
  SCSS: DIR.SRC + '/scss/*.scss',
  HTML: DIR.SRC + '/*.html',
  IMAGES: DIR.SRC + '/images/*',
  SERVER: 'server/*.js',
};

const DEST = {
  JS: DIR.DEST + '/js',
  CSS: DIR.DEST + '/css',
  HTML: DIR.DEST + '/',
  IMAGES: DIR.DEST + '/images',
  SERVER: 'app',
};

gulp.task('default', ['clean', 'lint', 'jest', 'webpack', 'html', 'sass', 
  'image', 'watch', 'start', 'browser-sync'],() => {
  gutil.log(gutil.colors.yellow('Gulp is running for you! 🙋'));
});

gulp.task('clean', () => {
  return del.sync([DIR.DEST]);
});

gulp.task('lint', () => {
  return gulp.src([SRC.JS, SRC.SERVER])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('jest', () => {
  process.env.NODE_ENV = 'test';

  return gulp.src(DIR.TEST)
    .pipe(jest());
});

gulp.task('html', () => {
  return gulp.src(SRC.HTML)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST.HTML));
});

gulp.task('sass', () => {
  const scssOptions = {
    outputStyle: 'compact',
    sourceComments: false,
  };

  return gulp.src(SRC.SCSS)
    .pipe(sourcemaps.init())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(DEST.CSS));
});

gulp.task('image', () => {
  return gulp.src(SRC.IMAGES)
    .pipe(gulp.dest(DEST.IMAGES));
});

gulp.task('start', ['babel'], () => {
  return nodemon({
    script: DEST.SERVER + '/App.js',
    watch: DEST.SERVER,
  });
});

gulp.task('babel', () => {
  return gulp.src(SRC.SERVER)
    .pipe(cache.filter())
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest(DEST.SERVER));
});

gulp.task('webpack', () => {
  return gulp.src('src/js/init.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['dist/**/*.*'],
    port: 7000,
  });
});

// watches
gulp.task('watch', () => {
  let watcher = {
    webpack: gulp.watch(SRC.JS, ['webpack']),
    sass: gulp.watch(SRC.SCSS, ['sass']),
    html: gulp.watch(SRC.HTML, ['html']),
    babel: gulp.watch(SRC.SERVER, ['babel']),

  };

  let notify = (e) => {
    gutil.log('File', gutil.colors.yellow(e.path), 'was', gutil.colors.magenta(e.type));
  };

  for(let key in watcher) {
    watcher[key].on('change', notify);
  }
});