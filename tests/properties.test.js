const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
  await page.login();
});

afterEach(async () => {
  // await page.close();
});

describe('Dashboard:', () => {
  test('clicking add new property navigates to addProperty page', async () => {
    await page.click('a[href="/addProperty"]');
    await page.waitFor('#PlacesAutocomplete__root');
    const text = await page.getContentsOf('label');
    expect(text).toEqual('Address of property');
  });
});

describe('Add Property Step 1:', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000/addProperty');
    await page.waitFor('#PlacesAutocomplete__root');
  });

  test.only('address and unit number > next step', async () => {
    await page.type('#PlacesAutocomplete__root', '120 merion ter');
    await page.waitFor('#PlacesAutocomplete__autocomplete-container');
    await page.click('#PlacesAutocomplete__autocomplete-container div'); // select option...
    await page.type('#unitNumber', '333');
    await page.click('.addPropertyBtn');
    await page.waitFor('#airbnb');
    const text = await page.getContentsOf('label');
    expect(text).toEqual('airbnb');
  });
  test('Address is required and will display error message on next', async () => {});
});
