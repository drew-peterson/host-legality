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

  test('focus email and password and submit will show error messages', async () => {
    await page.type('#email', ' ');
    await page.type('#password', '');
    await page.type('#email', ' ');
    const eSelector = 'form > div:nth-child(1) > div:nth-child(5)';
    const pSelector = 'form > div:nth-child(2) > div:nth-child(5)';
    await page.waitFor(eSelector);
    await page.waitFor(pSelector);
    const pText = await page.getContentsOf(pSelector);
    const eText = await page.getContentsOf(eSelector);

    expect(pText).toEqual('password is a required field');
    expect(eText).toEqual('email is a required field');
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

  test('With invalid email show error', async () => {
    const eSelector = 'form > div:nth-child(1) > div:nth-child(5)';
    await page.type('#email', 'test');
    await page.type('#password', ' ');
    await page.waitFor(eSelector);
    const text = await page.getContentsOf(eSelector);
    expect(text).toEqual('email must be a valid email');
  });

  test('focus email and password and submit will show error messages', async () => {
    await page.type('#email', ' ');
    await page.type('#password', '');
    await page.type('#email', ' ');
    const eSelector = 'form > div:nth-child(1) > div:nth-child(5)';
    const pSelector = 'form > div:nth-child(2) > div:nth-child(5)';
    await page.waitFor(eSelector);
    await page.waitFor(pSelector);
    const pText = await page.getContentsOf(pSelector);
    const eText = await page.getContentsOf(eSelector);

    expect(pText).toEqual('password is a required field');
    expect(eText).toEqual('email is a required field');
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
