const Page = require('./helpers/page');

let page;
// run before each test
beforeEach(async () => {
  page = await Page.build(); // custom helper to setup our page and broswer
  await page.goto('http://localhost:3000'); // still have to manually open page
});

// after each close browser
afterEach(async () => {
  await page.close(); // calls proxy browser.close()
});

test('Header has the correct text', async () => {
  const text = await page.getContentsOf('#logo-nav');
  expect(text).toEqual('Host Legality');
});

test('Clicking on sign in takes you to welcome back page', async () => {
  await page.waitFor('#login-nav');
  await page.click('#login-nav');
  await page.waitFor('form');
  const text = await page.getContentsOf('h1');
  expect(text).toEqual('Welcome Back!');
});

test('Clicking on get started takes to signup page', async () => {
  await page.waitFor('#signup-nav');
  await page.click('#signup-nav');
  await page.waitFor('form');
  const text = await page.getContentsOf('h1');
  expect(text).toEqual('Get Started!');
});

test('When logged in show dashboard and logout button', async () => {
  await page.login();
  const dashboardText = await page.getContentsOf('#dashboard-nav');
  const logoutText = await page.getContentsOf('#logout-nav');
  expect(dashboardText).toEqual('dashboard');
  expect(logoutText).toEqual('logout');
});

test('when logout header updates', async () => {
  await page.login();
  await page.waitFor('#logout-nav');
  await page.click('#logout-nav');
  await page.waitFor('#login-nav');
  const text = await page.getContentsOf('#login-nav');
  expect(text).toEqual('Sign in');
});
