module.exports = {
  getJWT: () => localStorage.getItem('anovaToken'),
  removeJWT: () => localStorage.removeItem('anovaToken'),
  getUser: () => localStorage.getItem('anovaUser'),
  removeUser: () => localStorage.removeItem('anovaUser')
};
