// import config from '../config';
import { getCookie, delCookie } from './helper';

// Auth
export function getAuthHeader(sso_token) {
  return ({
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "token": "3a90beddb879790a606bcb1141e325d9",
        "Cookie": sso_token || "",
        "Access-Control-Expose-Headers": "Set-Cookie",
        "Access-Control-Allow-Credentials": "true"
    }
  });
}

// export function redirectLogin() {
//   localStorage.clear();
//   window.location.href = config.redirectUrl + window.location.origin;
// }

export function authenticated() {
  const sso_token = getCookie('sso_token');
  if (!sso_token) {
    redirectLogin();
  }
}

// export function logOut() {
//   delCookie({
//     name: 'sso_token',
//     path: '/',
//     domain: '.corp.visiondk.com',
//   });
//   authenticated();
// }