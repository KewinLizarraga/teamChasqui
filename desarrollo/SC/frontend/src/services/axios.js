import { create } from 'axios';

export default create({
  baseURL: 'http://206.189.175.34:8000/api/v1',
  validateStatus: (status) => {
    return status < 500;
  }
});
