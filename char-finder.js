const database = require('./database');
const resultSaver = require('./result-saver');

const findChar = function (params) {
  database.getPagesCount()
    .then(pagesCount => database.getCharsAllPages(pagesCount))
    .then(allChars => {
      const result = allChars.filter(character => {
        let isCharMatchesConditions = true;
        Object.keys(character).forEach(property => {
          if (params[property] && character[property] !== params[property]) {
            isCharMatchesConditions = false;
          }
        });
        if (isCharMatchesConditions) {
          return character;
        };
      });
      resultSaver.saveResult(result, params.name);
    });
};

exports.findChar = findChar;
