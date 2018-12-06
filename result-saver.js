const fs = require('fs');

fs.existsSync('./result') || fs.mkdirSync('./result');

const saveResult = function (result, name) {
  name = name || 'search_result';
  if (result.length <= 5) {
    showResults(result);
  } else { console.log(`${result.length} results was found`); }
  fs.writeFileSync(`./result/${name}.json`, JSON.stringify(result, null, ' '));
  console.log(`File ./result/${name}.json succesfully created`);
};

function showResults (result) {
  result.forEach(character => {
    console.log(JSON.stringify(character, null, ' '));
  });
};

exports.saveResult = saveResult;
