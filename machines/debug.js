module.exports = {


  friendlyName: 'Log (debug)',


  description: 'Write a "debug"-level message to the Sails log.',


  extendedDescription: 'The Sails log typically outputs "debug"-level messages directly to stderr, but this can be configured using ' +
                       'the `sails.config.log` setting in your Sails app (see the [captains-log docs](https://github.com/balderdashy/captains-log) for more info).\n\n' +

                       'Note that a newline will be automatically appended to the message.\n\n' +

                       'Set the `verbose` input to `true` to use the "verbose" level instead of "debug".',


  moreInfoUrl: 'http://sailsjs.org/documentation/concepts/logging',


  habitat: 'sails',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value that will be written to the Sails log.',
      example: '===',
      required: true
    },

    verbose: {
      friendlyName: 'Verbose?',
      description: 'Whether to use the "verbose" log level instead of "debug".',
      moreInfoUrl: 'http://sailsjs.org/documentation/concepts/logging#?log-levels',
      example: true,
      defaultsTo: false
    }

  },


  fn: function(inputs, exits, env) {

    // Import `lodash`.
    var _ = require('lodash');

    // Ensure `env.sails`, returning through the `error` exit
    // if it cannot be found or is not an object.
    if (!_.isObject(env.sails) || env.sails.constructor.name !== 'Sails') {
      return exits.error(new Error('No Sails application object could be found in the machine environment!'));
    }

    // If the `verbose` input is set, log using the "verbose" level.
    if (inputs.verbose) {
      env.sails.log.verbose(inputs.value);
    }
    // Otherwise log using the "debug" level.
    else {
      env.sails.log.debug(inputs.value);
    }

    // Return through the `success` exit.
    return exits.success();
  }

};
