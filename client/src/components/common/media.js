import { css } from 'styled-components';

// these sizes are arbitrary and you can set them to whatever you wish

const sizes = {
  giant: 1824,
  desktop: 1224,
  tablet: 768
  // mobile: 376
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const remSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${remSize}rem) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export { media };
