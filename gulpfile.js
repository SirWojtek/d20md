"use strict";

const gulp = require("gulp");
const exec = require("child_process").exec;
const process = require('process');

const converterDir = __dirname + '/tools/xml2json/';
const outputJsonDir = __dirname + '/tools/jsonOut/';
const inputXmlDir = __dirname + '/tools/xmlInput/';

function createExecCallback(cb = (err) => {}) {
  return (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  }
}

gulp.task("convert_spells_xml", (cb) => {
    exec(
      converterDir + 'spellConverter.py ' + inputXmlDir + ' ' + outputJsonDir,
      { shell: '/bin/bash' },
      createExecCallback(cb)
    );
});

gulp.task("convert_feats_xml", (cb) => {
    exec(
      converterDir + 'featConverter.py ' + inputXmlDir + ' ' + outputJsonDir,
      { shell: '/bin/bash' },
      createExecCallback(cb),
    );
});

gulp.task("convert_monsters_xml", (cb) => {
    exec(
      converterDir + 'monsterConverter.py ' + inputXmlDir + ' ' + outputJsonDir,
      { shell: '/bin/bash' },
      createExecCallback(cb),
    );
});

gulp.task('convert_xmls', gulp.parallel('convert_spells_xml', 'convert_feats_xml', 'convert_monsters_xml'));

gulp.task('migrate', (cb) => {
  exec('sequelize db:migrate', createExecCallback(cb));
});

gulp.task('create_db', (cb) => {
  exec('sequelize db:create', createExecCallback(cb));
});

gulp.task('seed', (cb) => {
  exec('sequelize db:seed:all', createExecCallback(cb));
});

gulp.task('seed_undo', (cb) => {
  exec('sequelize db:seed:undo:all', createExecCallback(cb));
});

gulp.task("prepare_db", gulp.series(
  'create_db',
  'migrate',
  'seed',
));
