import { create } from 'axios';

export default create({
  baseURL: 'http://localhost:8000/api/v1',
  validateStatus: (status) => {
    return status < 500;
  }
});
