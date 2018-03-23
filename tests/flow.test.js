const Page = require('./helpers/page');
const faker = require('faker');
const gql = require('graphql-tag');
let page;
let _user;
let _property;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
  _user = await page.login();
  _property = await page.newProperty({
    _user: _user._id,
    address: '3336 International Blvd, Oakland, CA 94601, USA'
  });
  await page.reload();
  await page.waitFor('.containerWrap');
});

afterEach(async () => {
  await page.close();
});

describe('Flow:', () => {
  test('New Property shows up in list', async () => {
    await page.waitFor('.address');
    const address = await page.getContentsOf('.address');
    const status = await page.getContentsOf('.status');
    expect(address).toEqual(_property.address);
    expect(status).toEqual(_property.status);
  });

  test('Clicking on property lands on paymentPlan', async () => {
    await page.waitFor('.address');
    await page.click('.address');
    const text = await page.getContentsOf('h3');
    expect(text).toEqual(_property.address);
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

    test.only('component payment updates property status on dashboard to paid', async () => {
      const stripe = {
        amount: 25.0,
        description: 'test description',
        tokenID: 'tok_visa' // test token
      };

      const mutation = {
        variables: {
          propertyID: _property._id,
          stripe
        },
        query: gql`
          mutation PropertyMakePayment(
            $propertyID: ID!
            $stripe: StripeInput!
          ) {
            propertyMakePayment(propertyID: $propertyID, stripe: $stripe) {
              _id
              address
              status
              compliance
            }
          }
        `
      };
      await page.post('/graphql', mutation);
      await page.goto('http://localhost:3000/dashboard');
      await page.waitFor('.status');
      const text = await page.getContentsOf('.status');
      expect(text).toEqual('paid');
    });
  });
});
