export function setToken(token){ localStorage.setItem('aat_token', token); }
export function getToken(){ return localStorage.getItem('aat_token'); }
export function setUser(u){ localStorage.setItem('aat_user', JSON.stringify(u)); }
export function getUser(){ try{ return JSON.parse(localStorage.getItem('aat_user')) }catch(e){return null} }
export function logout(){ localStorage.removeItem('aat_token'); localStorage.removeItem('aat_user'); window.location='/login'; }
