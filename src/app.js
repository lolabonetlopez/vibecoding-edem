const APP_NAME = 'Murdoku';

if (typeof document !== 'undefined') {
  document.getElementById('app-title').textContent = APP_NAME;
}

if (typeof module !== 'undefined') {
  module.exports = { APP_NAME };
}
