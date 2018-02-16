import axios from 'axios';
import { FLOW_SUBMIT_STEP } from './types';

export const flowSubmitStep = ({
  values,
  step,
  property
}) => async dispatch => {
  const res = await axios.put(`/api/property/flow/${property._id}`, {
    values,
    step
  });
  dispatch({ type: FLOW_SUBMIT_STEP, payload: res.data });
};
