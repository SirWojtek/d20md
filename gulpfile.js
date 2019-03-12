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

gulp.task('migrate_undo', (cb) => {
  exec('sequelize db:migrate:undo:all', createExecCallback(cb));
});

gulp.task('seed', (cb) => {
  exec('sequelize db:seed:all', createExecCallback(cb));
});

gulp.task('seed_undo', (cb) => {
  exec('sequelize db:seed:undo:all', createExecCallback(cb));
});

gulp.task("run_e2e", (cb) => {
  const serverProcess = exec('./server.js', createExecCallback());

  exec('cd frontend && yarn e2e', createExecCallback((err) => {
    serverProcess.kill();
    cb(err);
  }));
});

gulp.task("e2e_test", gulp.series(
  'migrate_undo',
  'migrate',
  'run_e2e',
));
