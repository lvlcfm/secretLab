module.exports = {
  getJWT: () => {
    const retJWT = JSON.parse(localStorage.getItem('anovaToken'));
    return retJWT;
  },
  removeJWT: () => localStorage.removeItem('anovaToken'),
  getUser: () => {
    const retUser = JSON.parse(localStorage.getItem('anovaUser'));
    return retUser;
  },
  removeUser: () => localStorage.removeItem('anovaUser')
};
