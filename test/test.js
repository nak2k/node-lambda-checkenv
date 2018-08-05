const test = require('tape');
const { checkenv } = require('..');

test('test', t => {
  t.plan(2);

  try {
    checkenv({
      xxx: true,
    });
  } catch (err) {
    t.equal(err.code, 'INVALID_ENVVARS');
    t.ok(err);
  }
});

test('test', t => {
  t.plan(1);

  checkenv({
    NODE_PATH: true,
  });

  t.ok(true);
});
