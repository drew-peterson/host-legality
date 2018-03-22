const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
  await page.login();
});

afterEach(async () => {
  await page.close();
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

  // test('address and unit number > next step', async () => {
  //   await page.type(
  //     '#PlacesAutocomplete__root',
  //     '120 merion terrace moraga ca'
  //   );
  //   await page.waitFor('#PlacesAutocomplete__autocomplete-container');
  //   await page.click('#PlacesAutocomplete__autocomplete-container div'); // select option...
  //   await page.type('#unitNumber', '333');
  //   await page.waitFor('.addPropertyBtn:enabled');
  //   await page.click('.addPropertyBtn:enabled');
  //   await page.waitFor('#airbnb');
  //   const text = await page.getContentsOf('label');
  //   expect(text).toEqual('airbnb');
  // });

  test('Address is required and will display error message on next', async () => {
    await page.click('.addPropertyBtn');
    await page.waitFor('#autocomplete_error');
    const text = await page.getContentsOf('#autocomplete_error');
    expect(text).toEqual('valid address is required');
  });

  describe('Add property step 2:', () => {
    beforeEach(async () => {
      await page.type('#PlacesAutocomplete__root', '120 merion terrace moraga');
      await page.waitFor('#PlacesAutocomplete__autocomplete-container');
      await page.click('#PlacesAutocomplete__autocomplete-container div'); // select option...
      await page.type('#unitNumber', '333');
      await page.waitFor('.addPropertyBtn:enabled');
      await page.click('.addPropertyBtn:enabled');
      await page.waitFor('#airbnb');
    });

    test('Host is required and will display and error message', async () => {
      await page.click('.addPropertyBtn');
      await page.waitFor('#host_error');
      const text = await page.getContentsOf('#host_error');
      expect(text).toEqual('please select a host');
    });
    test('selecting a host and submitting', async () => {
      await page.click('#airbnb');
      await page.waitFor('.addPropertyBtn:enabled');
      await page.click('.addPropertyBtn:enabled');
      await page.waitFor('.propertyItem');
      const textA = await page.getContentsOf('.propertyItem .address');
      const textS = await page.getContentsOf('.propertyItem .status');

      expect(textA).toEqual('120 Merion Terrace, Moraga, CA 94556, USA');
      expect(textS).toEqual('pending-payment');
    });
  });
});
