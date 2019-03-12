const env = require('../environment/environment');

const uuidv4 = require('uuid/v1');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

function resizeImage(inputPath) {
  return sharp(inputPath).resize(200, 200).png();
}

function uploadLocal(file) {
  const outputImagePath = 'img/users/' + uuidv4() + '.png';
  const fullOutputImagePath = './frontend/src/' + outputImagePath;

  if (!file.path) { throw Error('File not provided'); }

  return resizeImage(file.path).toFile(fullOutputImagePath)
    .then((outputPath) => {
      return fs.unlink(file.path).then(() => {
        return outputImagePath;
      });
    });
}

function removeLocal(path) {
  if (!path) { return Promise.resolve(); }
  const fullOldImagePath = './build/' + path;
  return fs.unlink(fullOldImagePath)
  .catch(err => console.warn(err));
}

const aws = require('aws-sdk');
aws.config.loadFromPath('./aws/config-images.json');

const s3 = new aws.S3();
const imageBucket = 'd20md-user-images';

function uploadToS3(file) {
  const imageFilename = uuidv4() + '.png';
  const outputS3Image = 'img/users/' + imageFilename;

  if (!file.path) { throw Error('No image provided'); }

  return new Promise((resolve, reject) => {
    resizeImage(file.path).toBuffer().then(blob => {
      fs.unlink(file.path).then(() => {
        s3.putObject({
          Body: blob,
          Bucket: imageBucket,
          Key: outputS3Image,
        }, (err, data) => {
          if (err) { reject(err); }
          else { resolve(outputS3Image); }
        });
      });
    });
  });
}

function removeFromS3(pathToRemove) {
  if (!pathToRemove) { return Promise.resolve(); }
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: imageBucket,
      Key: path.basename(pathToRemove),
    }, (err, data) => {
      if (err) { reject(err); }
      else { resolve(); }
    });
  });
}

module.exports = {
  upload: env.uploadImagesToS3 ? uploadToS3 : uploadLocal,
  remove: env.uploadImagesToS3 ? removeFromS3 : removeLocal
}
