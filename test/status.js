'use strict';

var fs = require('fs');
var path = require('path');
var should = require('should');
var Vinyl = require('vinyl');

module.exports = function(git, util) {

  it('should git status --porcelain', function(done) {

    var opt = {args: '--porcelain', cwd: 'test/repo'};
    var fakeFile = new Vinyl(util.testFiles[0]);
    var fakeRelative = '?? ' + path.relative(util.repo, fakeFile.path);
    fs.openSync(fakeFile.path, 'w');

    git.status(opt, function(err, stdout) {
      should(err).be.eql(null);
      fs.exists(fakeFile.path, function(exists) {
        exists.should.be.true();
        stdout.split('\n')
          .should.containDeep([fakeRelative]);
        done();
      });
    });
  });

};
