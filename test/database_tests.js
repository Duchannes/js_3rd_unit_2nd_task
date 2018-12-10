/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const fs = require('fs');

const database = require('../database');

const expect = chai.expect;

// Hardcode for pages count?
const pagesCount = 25;
// const posData = [1, 20, 26];  // separate test for each number of pages?
const allChars = JSON.parse(fs.readFileSync('./test/testdata/allchars.json', 'utf-8'));

describe('database', function () {
  describe('#getPagesCount()', function () {
    it('check for getting pages count', async function () {
      const pages = await database.getPagesCount();
      expect(pages).to.be.equal(pagesCount);
    }); // just one reiteration?
  });

  describe('#getCharsAllPages()', function () {
    it('check for getting all characters (positive data)', async function () {
      const chars = await database.getCharsAllPages(pagesCount);
      expect(chars).to.be.equal(allChars); // How to compare? result = AssertionError: expected [ Array(493) ] to equal [ Array(493) ]
      // too long if stringify()
    });
  });
});
