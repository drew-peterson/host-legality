const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  // cannot call a static method on class from outside class
  // called without creating a instance of CustomPage
  static async build() {
    const env = process.env.NODE_ENV;
    let options;
    if (['test', 'development'].includes(env)) {
      options = {
        headless: false
        // slowMo: 20 // slow down by 20ms
      };
    } else {
      options = {
        headless: true,
        args: ['--no-sandbox']
      };
    }

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    // allow lookups on other classes/objects for methods so you can do customPage.goTo --> find the page.goTo
    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    //  set both cookies in header
    // look in chrome > application > cookies and name
    await this.page.setCookie({
      name: 'session',
      value: session
      // value: 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWFhYWFlNTE2NGZhMWUyN2E4NjUwYWIxIn19'
    });
    await this.page.setCookie({
      name: 'session.sig',
      value: sig
      // value: 'YBsgxv2ti8ld6He9qqRRxP52Rk4'
    });

    await this.page.goto('http://localhost:3000/dashboard');
    await this.page.waitFor('#logout-nav'); // wait for component to render first...
    return user;
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  get(route) {
    return this.page.evaluate(_route => {
      return fetch(_route, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, route); // have to include the args to get access in closure scope
  }

  post(route, data) {
    // _name are just args they are not shared so just use _ to make diff
    return this.page.evaluate(
      (_route, _data) => {
        // have to use fetch w/ jest
        return fetch(_route, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_data)
        }).then(res => res.json());
      },
      route,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }

  newUser() {
    return userFactory();
  }

  async newProperty(address) {
    await this.page.goto('http://localhost:3000/addProperty');
    await this.page.waitFor('#PlacesAutocomplete__root');
    await this.page.type('#PlacesAutocomplete__root', address);
    await this.page.waitFor('#PlacesAutocomplete__autocomplete-container');
    await this.page.click('#PlacesAutocomplete__autocomplete-container div'); // select option...
    await this.page.waitFor(2000);
    await this.page.click('.addPropertyBtn');
    await this.page.waitFor('#airbnb');
    await this.page.click('#airbnb');
    await this.page.waitFor(2000);
    await this.page.click('.addPropertyBtn');
    await this.page.waitFor('.containerWrap');
  }
}

module.exports = CustomPage;
