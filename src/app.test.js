const test = require('node:test');
const assert = require('node:assert/strict');
const { APP_NAME } = require('./app.js');

test('el nombre de la app es Murdoku', () => {
  assert.equal(APP_NAME, 'Murdoku');
});
