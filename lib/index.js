const { error } = require('lambda-console');

exports.checkenv = defs => {
  const errors = {};
  let hasError;

  Object.keys(defs).forEach(key => {
    const value = defs[key];

    if (value === true) {
      if (process.env[key] === undefined) {
        hasError = true;

        const err = new Error(`Environment variable '${key}' is undefined`);
        errors[key] = err;
        error(err);
      }
    }
  });

  if (!hasError) {
    return;
  }

  const names = Object.keys(errors);

  const err = new Error(`Invalid environment variables. ${names.join(', ')}`);
  err.code = 'INVALID_ENVVARS';
  err.errors = errors;

  throw err;
};
