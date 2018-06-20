import decode from 'jwt-decode'

const loggedIn = () => {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}

const isTokenExpired = (token) =>  {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    else
      return false;
  } catch (err) {
    return false;
  }
}

const setToken = (idToken) =>  {
  localStorage.setItem('token', idToken)
}

const getToken = () =>  {
  return localStorage.getItem('token')
}

const logout = () =>  {
  localStorage.removeItem('token');
}

const getProfile = () =>  {
  return decode(getToken());
}

export {
  loggedIn,
  isTokenExpired,
  setToken,
  getToken,
  logout,
  getProfile
}
