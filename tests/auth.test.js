const Page = require('./helpers/page');
const faker = require('faker');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  // await page.close();
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
    await page.type('#email', faker.internet.email());
    await page.type('#password', 'test');
    await page.click('button[type=submit'); // submit button
    await page.waitFor('#addProperty');
    const text = await page.getContentsOf('label');
    expect(text).toEqual('Address of property');
  });

  // test('Signup > logout > login successfull', async () => {
  //   const email = faker.internet.email();
  //   await page.type('#email', email);
  //   await page.type('#password', 'test');
  //   await page.click('button[type=submit'); // submit button
  //   await page.waitFor('#addProperty');
  //   await page.click('#logout-nav');
  //   await page.goto('localhost:3000/login');
  //   await page.waitFor('a[href="/forgotPassword"]');
  //   await page.type('#email', email);
  //   await page.type('#password', 'test');
  //   await page.click('button[type=submit'); // submit button
  //   await page.waitFor('a[href="/addProperty"]');
  //   const text = await page.getContentsOf('h1');
  //   expect(text).toEqual('My Properties');
  // });
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
});

describe('Password Reset', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/forgotPassword');
  });

  test.only('submit with email shows success message', async () => {
    await page.type('#email', 'test@tesreee3et.com');
    await page.click('button');
    await page.waitFor('p');
    const text = await page.getContentsOf('p');
    expect(text).toEqual(
      'Password reset link was sent to email: test@test.com'
    );
  });
});
