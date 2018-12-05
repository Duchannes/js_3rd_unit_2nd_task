const charFinder = require('./char-finder');

// eslint-disable-next-line no-unused-vars
const yargs = require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'findchar <name> [id] [status] [species] [gender]',
    'Find character given by <name>',
    (yargs) => {
      yargs.positional(
        'id', {
          alias: 'i',
          desc: 'The id of the character',
          type: 'number'
        })
        .positional('status', {
          alias: 's',
          desc: 'The status of the character',
          choices: ['Alive', 'Dead', 'Unknown'],
          type: 'string'
        })
        .positional('species', {
          alias: 'sp',
          desc: 'The species of the character',
          type: 'string'
        })
        .positional('gender', {
          alias: 'g',
          desc: 'The gender of the character',
          choices: ['Female', 'Male', 'Genderless', 'Unknown'],
          type: 'string'
        });
    },
    function (argv) {
      const params = {
        name: argv.name,
        id: argv.id,
        status: argv.status,
        species: argv.species,
        gender: argv.gender
      };
      charFinder.findChar(params);
    })
  .demandCommand(1, 'You need at least one command before moving on. Type "task --help" for help')
  .help()
  .argv;
