import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import { change } from 'redux-form';

import styled from 'styled-components';

import { rem } from '../components/common';
class GooleAutoComplete extends React.Component {
  state = {
    address: ''
  };

  async onSelect(address) {
    this.setState({ address });
    const { meta: { dispatch, form }, input: { name } } = this.props;
    const gAddress = await geocodeByAddress(address);
    const latLng = await getLatLng(gAddress[0]);

    // save property on reduxForm
    dispatch(change(form, name, { gAddress: gAddress[0], latLng }));
  }

  render() {
    const { placeholder } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: address => this.setState({ address }),
      autoFocus: true,
      placeholder
    };

    return (
      <InputWrap>
        <Label>Address of property</Label>
        <PlacesAutocomplete
          inputProps={inputProps}
          styles={myStyles}
          onSelect={this.onSelect.bind(this)}
        />
      </InputWrap>
    );
  }
}

const myStyles = {
  // root: { border: 'none' },
  input: {
    border: 'none',
    borderBottom: '2px solid #00bcd4',
    marginTop: rem(7),
    padding: 0,
    display: 'block',
    paddingBottom: rem(7)
  },
  autocompleteContainer: { zIndex: '1000' }
  // autocompleteItem: { color: 'black' },
  // autocompleteItemActive: { color: 'blue' }
};

const Label = styled.label`
  color: #000000;
  opacity: 0.3;
  font-size: ${rem(13)};
`;

const InputWrap = styled.div`
  position: relative;
`;

export default GooleAutoComplete;
