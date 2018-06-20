const reEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

export default (email) => {
  if (!reEmail.test(email)) {
    return 'Por favor, ingrese un email valido.';
  }
  return;
}
