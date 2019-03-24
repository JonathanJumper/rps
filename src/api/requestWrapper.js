import axios from 'axios'
import {BASE_URL} from '../utils/CONSTANTS'

/**
 * Create an Axios Client with defaults
 */
var client = axios.create({
  baseURL: BASE_URL
});

/**
 * Request Wrapper with default success/error actions
 */
const requestWrapper = function(options) {
  const onSuccess = function(response) {
    //console.debug('Request Successful!', response);
    return response;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the requestWrapper
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default requestWrapper;