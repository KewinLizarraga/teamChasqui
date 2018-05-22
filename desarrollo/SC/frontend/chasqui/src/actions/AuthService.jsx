import decode from 'jwt-decode'
import axios from 'axios'

export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://206.189.175.34:8000/api/v1/auth/login'
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    loggedIn() {   
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    login(email, password) {
        const user = {
            email: email,
            password: password
        }
        return axios.post('http://206.189.175.34:8000/api/v1/auth/login', user)
        .then(this._checkStatus)
        .then(response => {
            this.setToken(response.data.token)
            return response
        })           
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
           
        } else {
            let error = new Error(response.statusText)    
            error.response = response
            throw error
        }
    }
}