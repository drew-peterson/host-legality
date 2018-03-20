import axios from 'axios';

export const GQL = async query => {
  try {
    const { data: { data, errors } } = await axios.post('/graphql', query);
    if (errors) {
      throw errors;
    }
    return data;
  } catch (err) {
    throw err;
  }
};
