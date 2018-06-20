const socialIcons = [
  { id: 'facebook', to: '#', icon: ' fab fa-facebook' },
  { id: 'twitter', to: '#', icon: ' fab fa-twitter' },
  { id: 'google', to: '#', icon: ' fab fa-google-plus-g' }
];
const loginData = {
  title: 'Iniciar sesión',
  buttonText: 'Ingresar',
  extraText: '¿Olvidaste la Contraseña?',
  socialIcons,
  inputs: [
    { id: 'email', type: 'email', label: 'Correo electrónico', size: 12 },
    { id: 'password', type: 'password', label: 'Contraseña', size: 12 }
  ]
};
const registerData = {
  title: 'Registrese',
  buttonText: 'Registrar',
  socialIcons,
  inputs: [
    { id: 'first_name', type: 'text', label: 'Nombres', size: 6 },
    { id: 'last_name', type: 'text', label: 'Apellidos', size: 6 },
    { id: 'email', type: 'email', label: 'Correo electrónico', size: 12 },
    { id: 'password', type: 'password', label: 'Contraseña', size: 12 },
    { id: 'password2', type: 'password', label: 'Confirmar contraseña', size: 12 }
  ]
};

export {
  loginData,
  registerData
}
