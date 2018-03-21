import { FLOW_SUBMIT_STEP } from './types';
import { GQL } from '../utils/helpers';
import { FLOW_UPDATE } from '../graphql/mutations';

export const flowSubmitStep = variables => async dispatch => {
  try {
    const { flowUpdate } = await GQL({
      query: FLOW_UPDATE,
      variables
    });
    dispatch({ type: FLOW_SUBMIT_STEP, payload: flowUpdate });
  } catch (err) {
    console.log('flowSubmitStep err', err);
  }
};
