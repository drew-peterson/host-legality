import React, { Component } from 'react';
import NewHostForm from './NewHostForm';

import _ from 'lodash';

class NewHost extends Component {
  onSubmit(values) {
    console.log('values', values);
    const steps = {};
    _.each(values, (value, key) => {
      const idx = key[0]; // 0

      if (key === 'hostName') {
        steps['host'] = value;
      } else {
        const step = steps[idx]; //0:{}
        if (!step) {
          steps[idx] = { inputs: [] };
        }
        const sliceA = key.slice(2); //header , type-0
        if (sliceA.indexOf('-') >= 0) {
          const sliceBKey = sliceA.slice(-1);
          const sliceB = sliceA.slice(0, -2); // type

          const input = steps[idx].inputs[sliceBKey]; // {}
          if (!input) {
            const obj = {};
            obj[sliceB] = value;
            steps[idx].inputs.push(obj);
          } else {
            input[sliceB] = value;
          }
        } else {
          steps[idx][sliceA] = value;
        }
      }
    });
    console.log('steps', steps);
  }
  render() {
    return <NewHostForm onSubmit={this.onSubmit.bind(this)} />;
  }
}

export default NewHost;
