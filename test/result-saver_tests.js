/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai').use(require('chai-spies'));
const fs = require('fs-extra');

const resSaver = require('../result-saver');

const expect = chai.expect;

const posData = [{
  result: [ { test: 'test' }, { test: 'test2' }, { test: 'test3' } ],
  name: 'testName'
}, {
  result: [ { test: 'test' }, { test: 'test2' }, { test: 'test3' }, { test: 'test4' }, { test: 'test5' }, { test: 'tes6' }, { test: 'test7' } ],
  name: 'testName'
}, {
  result: [ { test: 'test', test2: 'test2' }, { test: 'test3' } ],
  name: 'testName'
} ];
const negData = [{
  result: { test: 'test' }, // Not an Array
  name: 'testName'
}, {
  result: [ { test: 'test', test2: 'test2' }, { test: 'test3' } ],
  name: undefined // Undefined name
}, {
  result: [ { test: 'test', test2: 'test2' }, { test: 'test3' } ],
  name: './././//||\\\\' // Wrong name
}, {
  result: [ undefined ], // Undefined result
  name: './././//||\\\\'
} ];

describe('result-saver', function () {
  let spyShowResults;

  beforeEach(() => {
    fs.emptyDirSync('./result/');
    spyShowResults = chai.spy.on(resSaver, 'showResults');
  });

  afterEach(() => {
    chai.spy.restore(resSaver, 'showResults');
  });

  describe('#saveResult()', function () {
    posData.forEach(data => {
      it('check for file existance (positive data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(fs.existsSync(`./result/${data.name || 'search_result'}.json`, `utf-8`) && fs.lstatSync(`./result/${data.name || 'search_result'}.json`, `utf-8`).isFile()).to.be.true;
      });
    });

    negData.forEach(data => {
      it('check for file existance (negative data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(fs.existsSync(`./result/${data.name || 'search_result'}.json`, `utf-8`) && fs.lstatSync(`./result/${data.name || 'search_result'}.json`, `utf-8`).isFile()).to.be.true;
      });
    });

    posData.forEach(data => {
      it('check for file contents (positive data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(JSON.stringify(JSON.parse(fs.readFileSync(`./result/${data.name || 'search_result'}.json`, `utf-8`)))).to.be.equal(JSON.stringify(data.result));
      });
    });

    negData.forEach(data => {
      it('check for file contents (negative data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(JSON.stringify(JSON.parse(fs.readFileSync(`./result/${data.name || 'search_result'}.json`, `utf-8`)))).to.be.equal(JSON.stringify(data.result));
      });
    });

    posData.forEach(data => {
      it('check for "showResult" calling (positive data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(spyShowResults).to.be.a.spy;
        if (data.result.length <= 5) {
          expect(spyShowResults).to.have.been.called;
        };
      });
    });

    negData.forEach(data => {
      it('check for "showResult" calling (negative data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(spyShowResults).to.be.a.spy;
        if (data.result.length <= 5) {
          expect(spyShowResults).to.have.been.called;
        };
      });
    });
  });
});
