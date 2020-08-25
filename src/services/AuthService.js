import apiUrl from './ApiConfig.js';
class AuthService{
	constructor(){
		this.apiUrl = apiUrl;
	}
	login(fields){
		// let body = new FormData();
		let body = new URLSearchParams();
		for(var key in fields) body.append(key,fields[key]);
		let obj = {
			method: 'POST',
			// body: JSON.stringify(fields),
			body:body,
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
		};
		return fetch(this.apiUrl+'/login',obj);
	}
	register(fields){
		// let body = new FormData();
		let body = new URLSearchParams();
		for(var key in fields) body.append(key,fields[key]);
		let obj = {
			method:'POST',
			// body: JSON.stringify(fields),
			body:body,
			headers:{
				// 'Content-Type':'application/json'
				'Content-Type':'application/x-www-form-urlencoded'
			},
		};
		return fetch(this.apiUrl+'/register',obj);
	}
	setToken(token){
		if(token) localStorage.setItem('r-api-token',token);
	}
	getToken(){
		return localStorage.getItem('r-api-token');
	}
	removeToken(){
		localStorage.removeItem('r-api-token');
	}
	setUserToken(token){
		if(token) localStorage.setItem('r-user-token',token);
	}
	getUserToken(){
		return localStorage.getItem('r-user-token');
	}
	removeUserToken(){
		localStorage.removeItem('r-user-token');
	}
}
export default new AuthService();