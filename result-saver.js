const fs = require('fs');

const saveResult = function (result, name) {
  fs.writeFileSync(`./result/${name}.json`, JSON.stringify(result, null, ' '));
  console.log(`File ./result/${name}.json succesfully created`);
};

exports.saveResult = saveResult;
