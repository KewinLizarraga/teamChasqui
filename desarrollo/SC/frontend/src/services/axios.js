import { create } from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/tinkuy';

console.log(localStorage.getItem('token'))
export const tinkuyAxios = create({
  baseURL: 'http://206.189.175.34:8000/api/v1',
  headers: {
    'x-access-token': localStorage.getItem('token')
  },
  validateStatus: (status) => {
    return status < 500;
  }
});

export const stripeAxios = create({
  baseURL: CLOUDINARY_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
