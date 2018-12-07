/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs-extra');

const resSaver = require('../result-saver');

const spyConsole = require('sinon').spy(console, 'log');
const spyResSaver = require('sinon').spy(resSaver, 'showResults');

const expect = chai.expect;
chai.use(chaiAsPromised);

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
} ];

beforeEach(() => {
  fs.emptyDirSync('./result/');
  spyConsole.resetHistory();
  spyResSaver.resetHistory();
});

describe('result-saver', function () {
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
      it('check for "found result" console output (positive data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(spyConsole.calledWith(`${data.result.length} results was found`)).to.be.equal((data.result.length >= 5));
      });
    });

    negData.forEach(data => {
      it('check for "found result" console output (negative data)', function () {
        resSaver.saveResult(data.result, data.name);
        expect(spyConsole.calledWith(`${data.result.length} results was found`)).to.be.equal((data.result.length >= 5));
      });
    });
  });
});
