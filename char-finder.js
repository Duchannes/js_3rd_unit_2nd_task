const database = require('./database');
const resultSaver = require('./result-saver');

const findChar = function (params, additionalParams) {
  database.getPagesCount()
    .then(pagesCount => database.getCharsAllPages(pagesCount))
    .then(allChars => {
      let result = allChars.filter(character => {
        let isCharMatchesConditions = true;
        if (params.name && !character.name.includes(params.name)) {
          isCharMatchesConditions = false;
        }
        Object.keys(character).forEach(property => {
          if (property !== 'name' && params[property] && (character[property] !== params[property])) {
            isCharMatchesConditions = false;
          }
        });
        if (isCharMatchesConditions) {
          return character;
        };
      });
      if (additionalParams) {
        result = additionalParams.origin ? originSearch(additionalParams.origin, result) : result;
        result = additionalParams.location ? locationSearch(additionalParams.location, result) : result;
      }
      if (result.length === 0) throw new Error(`Character specified by the given params wasn't found.`);
      resultSaver.saveResult(result, params.name);
    });
};

function originSearch (origin, characters) {
  characters = characters.filter(character => {
    if (character.origin.name.includes(origin)) {
      return character;
    }
  });
  return characters;
};

function locationSearch (location, characters) {
  characters = characters.filter(character => {
    if (character.location.name.includes(location)) {
      return character;
    }
  });
  return characters;
};

exports.findChar = findChar;
