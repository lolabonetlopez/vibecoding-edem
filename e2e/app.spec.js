const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const url = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;

test('la app se abre desde file:// y muestra su nombre', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));

  await page.goto(url);

  await expect(page).toHaveTitle('Murdoku');
  await expect(page.locator('#app-title')).toHaveText('Murdoku');
  expect(errores).toEqual([]);
});
