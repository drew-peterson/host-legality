const Page = require('./helpers/page');
const faker = require('faker');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('Signup: ', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/signup');
  });

  test('Invalid form values displays error', async () => {
    await page.click('button[type=submit'); // submit button
    await page.waitFor('.auth-error');
    const text = await page.getContentsOf('.auth-error');

    expect(text).toEqual('Valid credentials required');
  });

  test('Click google takes to to google oauth flow', async () => {
    await page.click('#google-oauth');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  test('Valid values successfull submit and redirect to addProperty', async () => {
    const email = 'test_' + Math.random() + '@test.com';
    await page.type('#email', email);
    await page.type('#password', 'test');
    await page.click('button[type=submit'); // submit button
    await page.waitFor('#addProperty');
    const text = await page.getContentsOf('label');
    expect(text).toEqual('Address of property');
  });
});

describe('Login', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/login');
  });

  test('navigate to login route', async () => {
    const text = await page.getContentsOf('h1');
    expect(text).toEqual('Welcome Back!');
  });
  test('Click google takes to to google oauth flow', async () => {
    await page.click('#google-oauth');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  test('Forgot password redirect to forgot password', async () => {
    await page.click('a[href="/forgotPassword"]');
    await page.waitFor('h2');
    const text = await page.getContentsOf('h2');
    expect(text).toEqual('Forgot Password');
  });

  test('login successfull', async () => {
    await page.type('#email', 'test@test.com'); // existing user
    await page.type('#password', 'test');
    await page.click('button[type=submit');
    await page.waitFor('a[href="/addProperty"]');
    const text = await page.getContentsOf('h1');
    expect(text).toEqual('My Properties');
  });

  test('With invalid credentials show error', async () => {
    await page.type('#email', 'tNOTREALEMAIL@test.com'); // existing user
    await page.type('#password', 'test');
    await page.click('button[type=submit');
    await page.waitFor('.auth-error');
    const text = await page.getContentsOf('.auth-error');
    expect(text).toEqual('Invalid credentials.');
  });

  test('With no credentials show error', async () => {
    await page.click('button[type=submit');
    await page.waitFor('.auth-error');
    const text = await page.getContentsOf('.auth-error');
    expect(text).toEqual('Valid credentials required');
  });
});

describe('Password Reset', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/forgotPassword');
  });

  test('submit with correct email shows success message', async () => {
    await page.type('#email', 'test@test.com'); // save in mlabs test
    await page.click('button');
    await page.waitFor('p');
    const text = await page.getContentsOf('p');
    expect(text).toEqual(
      'Password reset link was sent to email: test@test.com'
    );
  });

  test('submit with incorrect email shows error message', async () => {
    await page.type('#email', 'NOTREALEMAIL@test.com');
    await page.click('button');
    await page.waitFor('p');
    const text = await page.getContentsOf('p');
    expect(text).toEqual('No user found with email: NOTREALEMAIL@test.com');
  });
});
