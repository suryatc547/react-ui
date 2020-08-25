import apiUrl from './ApiConfig.js';
import AuthService from './AuthService.js';
class UserService{
	constructor(){
		this.apiUrl = apiUrl;
		this.apiToken = AuthService.getToken();
		this.userToken = AuthService.getUserToken();
	}
	getUserData(){
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			headers:headerData,
		};
		return fetch(this.apiUrl+'/users?user_token='+this.userToken,obj);
	}
	addProduct(fields){
		let body = new URLSearchParams();
		for(var key in fields) body.append(key,fields[key]);
		
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			method:'POST',
			// body: JSON.stringify(fields),
			body:body,
			headers:headerData,
		};
		return fetch(this.apiUrl+'/users/add-product',obj);
	}
	getProducts(){
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			headers:headerData,
		};
		return fetch(this.apiUrl+'/users/products',obj);
	}
	getCarts(){
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			headers:headerData,
			// body:'user_token='+this.userToken,
		};
		return fetch(this.apiUrl+'/users/my-cart?user_token='+this.userToken,obj);
	}
	addToCart(id){
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			headers:headerData,
			body:'user_token='+this.userToken+'&id='+id,
			method:'POST',
		};
		return fetch(this.apiUrl+'/users/add-cart',obj);
	}
	getProductInfo(id){
		let headerData = new Headers();
		headerData.append('Authorization','Bearer '+this.apiToken);
		headerData.append('Content-Type','application/x-www-form-urlencoded');
		let obj = {
			headers:headerData,
		};
		return fetch(this.apiUrl+'/users/view-product/'+id,obj);
	}
}
export default new UserService();