const Page = require('./helpers/page');
const faker = require('faker');
let page;
let _user;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
  _user = await page.login();
  await page.newProperty('120 Merion Terrace Moraga');
});

afterEach(async () => {
  await page.close();
});

describe('Flow:', () => {
  test('New Property shows up in list', async () => {
    await page.waitFor('.address');
    const address = await page.getContentsOf('.address');
    const status = await page.getContentsOf('.status');

    expect(address).toEqual('120 Merion Terrace, Moraga, CA 94556, USA');
    expect(status).toEqual('pending-payment');
  });

  test('Clicking on property lands on paymentPlan', async () => {
    const text = await page.getContentsOf('h3');
    expect(text).toEqual('120 Merion Terrace, Moraga, CA 94556, USA');
  });

  describe('Choose Payment:', () => {
    let planOptions;
    beforeEach(async () => {
      await page.waitFor('.address');
      await page.click('.address');
      await page.waitFor('.choosePlanForm');
      planOptions = {
        basic: {
          selector: 'form > div > div:nth-child(1) button',
          amount: '$30'
        },
        standard: {
          selector: 'form > div > div:nth-child(2) button',
          amount: '$25'
        },
        premium: {
          selector: 'form > div > div:nth-child(3) button',
          amount: '$50'
        }
      };
    });

    test('select basic plan', async () => {
      await page.click(planOptions.basic.selector);
      await page.waitFor('.stripeBtn');
      const text = await page.getContentsOf('h2');
      expect(text).toEqual(planOptions.basic.amount);
    });
    test('select standard plan', async () => {
      await page.click(planOptions.standard.selector);
      await page.waitFor('.stripeBtn');
      const text = await page.getContentsOf('h2');
      expect(text).toEqual(planOptions.standard.amount);
    });
    test('select premium plan', async () => {
      await page.click(planOptions.premium.selector);
      await page.waitFor('.stripeBtn');
      const text = await page.getContentsOf('h2');
      expect(text).toEqual(planOptions.premium.amount);
    });
  });
});
