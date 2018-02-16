import axios from 'axios';
import { FLOW_SUBMIT_STEP } from './types';

export const flowSubmitStep = ({
  values,
  step,
  property
}) => async dispatch => {
  console.log('id', property._id);
  const res = await axios.put(`/api/property/flow/${property._id}`, {
    values,
    step
  });
  console.log('res', res);
  // dispatch({ type: FLOW_SUBMIT_STEP, payload: res.data });
};
