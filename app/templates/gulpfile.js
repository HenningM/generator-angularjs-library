var gulp = require('gulp'),
  util = require('gulp-util'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  path = require('path'),
  ngmin = require('gulp-ngmin'),
  concat = require('gulp-concat');

var conf = {
  lrPort: 25786,
  httpPort: 8040,
  outputDir: 'dist'
};

scriptSrc = [
  'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.prefix',
  'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.js',
  'src/<%= config.libraryName.camelized %>/directives/**/*.js',
  'src/<%= config.libraryName.camelized %>/filters/**/*.js',
  'src/<%= config.libraryName.camelized %>/services/**/*.js',
  'src/<%= config.libraryName.camelized %>/<%= config.libraryName.camelized %>.suffix'
];

scriptLint = [
  'src/**/*.js',
  'gulpfile.js'
];

gulp.task('scripts', function(){
  gulp.src(scriptSrc)
    .pipe(concat('<%= config.libraryName.slugified %>.js'))
    .pipe(ngmin())
    .pipe(gulp.dest(conf.outputDir))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  gulp.src(scriptLint)
    .pipe(jshint());
});

gulp.task('watch', ['connect'], function(){
  gulp.watch(scriptSrc, ['scripts']);
});

gulp.task('connect', function(){
  return connect.server({
    root: ['dist', 'src'],
    port: conf.httpPort,
    livereload:{
      port: conf.lrPort
    },
  })
});

gulp.task('default', ['scripts']);
