import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { H1 } from '../components/common';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module).add('with text', () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
));

// maybe storybook is about showcasing your different components in different states
// there is also test with enjzme / jest some how... https://storybook.js.org/testing/react-ui-testing/

storiesOf('H1', module)
  .add('test', () => <H1>Test</H1>)
  .add('test 2', () => <H1>test 2</H1>);
