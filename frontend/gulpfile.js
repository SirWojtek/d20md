"use strict";

const gulp = require("gulp");
const exec = require("child_process").exec;
const process = require('process');
const parallelize = require("concurrent-transform");
const awspublish = require('gulp-awspublish');
const aws = require('aws-sdk');
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish');

const publisher = awspublish.create({
  region: 'eu-central-1',
  params: {
    Bucket: 'd20md'
  },
  credentials: new aws.SharedIniFileCredentials({ profile: "d20md" })
});

const cfSettings = {
  distribution: 'E1Q7ID7FD5U27D',
  wait: true,
  originPath: '/',
  indexRootPath: true,
  credentials: new aws.SharedIniFileCredentials({ profile: "d20md" })
}

gulp.task('tslint', (cb) => {
  exec('ng lint --format stylish', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

gulp.task('compile_production', (cb) => {
  exec('ng build --prod', {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

gulp.task('copy_google_console_file', () => {
  return gulp.src('./src/google7b610392397b507c.html')
    .pipe(gulp.dest('./dist'))
});


gulp.task('publish_s3', () => {
  return gulp.src('./dist/**')
    .pipe(parallelize(publisher.publish(), 10))
    .pipe(publisher.sync())
    .pipe(cloudfront(cfSettings))
    .pipe(awspublish.reporter())
});

gulp.task('deploy_frontend', gulp.series(
  'compile_production',
  'copy_google_console_file',
  'publish_s3'
));
