import LandingPage from '../views/LandingPage/LangindPage.jsx';
import LoginPage from '../views/LoginPage/LoginPage';
import NotFound from '../views/NotFound/NotFound';
import RegisterBusinessPage from '../views/RegisterBusinessPage/RegisterBusinessPage';
import RegisterBusinessTypePage from '../views/RegisterBusinessTypePage/RegisterBusinessTypePage';
import RegisterPage from '../views/RegisterPage/RegisterPage';
import HandleConfirmationPage from '../views/HandleConfirmationPage/HandleConfirmationPage';
import ConfirmEmailPage from '../views/ConfirmEmailPage/ConfirmEmailPage';

const indexRoutes = [{
  path: '/',
  name: 'Landing',
  component: LandingPage,
  exact: true
}, {
  path: '/login',
  name: 'Login',
  component: LoginPage
}, {
  path: '/register',
  name: 'Register',
  component: RegisterPage
}, {
  path: '/registerBusiness',
  name: 'RegisterBusiness',
  component: RegisterBusinessPage,
  exact: true
}, {
  path: '/registerBusiness/:businessType',
  name: 'RegisterBusinessType',
  component: RegisterBusinessTypePage
}, {
  path: '/handle-confirmation',
  name: 'HandleConfirmation',
  component: HandleConfirmationPage,
  exact: true
}, {
  path: '/handle-confirmation/:token',
  name: 'ConfirmEmail',
  component: ConfirmEmailPage
}, {
  name: 'NotFound',
  component: NotFound
}];

export default indexRoutes;
