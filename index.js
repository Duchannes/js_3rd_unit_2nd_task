const charFinder = require('./char-finder');

// eslint-disable-next-line no-unused-vars
const yargs = require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'findchar [name] [id] [status] [species] [gender]',
    'Find character given by <name>',
    (yargs) => {
      yargs.positional(
        'name', {
          alias: 'n',
          desc: 'The name of the character',
          type: 'string'
        })
        .positional('id', {
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
          alias: 'p',
          desc: 'The species of the character',
          type: 'string'
        })
        .positional('gender', {
          alias: 'g',
          desc: 'The gender of the character',
          choices: ['Female', 'Male', 'Genderless', 'Unknown'],
          type: 'string'
        })
        .positional('origin', {
          alias: 'o',
          desc: 'Name of the character\'s origin location.',
          type: 'string'
        })
        .positional('location', {
          alias: 'l',
          desc: 'Name of the character\'s last known location endpoint.',
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
      const additionalParams = {
        origin: argv.origin,
        location: argv.location
      };
      charFinder.findChar(params, additionalParams);
    })
  .demandCommand(1, 'You need at least one command before moving on. Type "task --help" for help')
  .help()
  .argv;
