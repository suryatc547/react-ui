import React from 'react';
import styles from './Dashboard.module.css';
import UserService from '../../services/UserService.js';
import {Alert,Table,Button} from 'react-bootstrap';

class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {fields:{username:''},errors:{},alert:false,alertType:'danger',message:'',products:[],showProduct:{product_name:'',price:''},mycart:[],total:''};
		this.getUserData = this.getUserData.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.getProductInfo = this.getProductInfo.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.getCarts = this.getCarts.bind(this);
	}
	componentDidMount(){
    	this.getUserData();
    	this.getCarts();
    	this.getProducts();
  	}
  	getProductInfo(e){
  		// console.log(e); return false;
  		// let id = e.target.getAttribue('data-id');
  		let id =e;
		UserService.getProductInfo(id).then(res => {
			res.json().then(resp => {
				if(resp.code === 200 && resp.data){
					// console.log(resp.data)
					this.setState({showProduct:resp.data});
				} 
			}).catch(e => console.log(e));
		}).catch(e => console.log(e));
	}
	addToCart(e){
  		// console.log(e); return false;
  		// let id = e.target.getAttribue('data-id');
  		let id =e;
		UserService.addToCart(id).then(res => {
			res.json().then(resp => {
				if(resp.code === 200 && resp.data){
					// console.log(resp.data)
					this.setState({mycart:resp.data.carts,total:resp.data.total});
				} 
			}).catch(e => console.log(e));
		}).catch(e => console.log(e));
	}
	getCarts(){
		UserService.getCarts().then(res => {
			res.json().then(resp => {
				if(resp.code === 200 && resp.data){
					// console.log(resp.data)
					// this.setState({mycart:resp.data});
					this.setState({mycart:resp.data.carts,total:resp.data.total});
				} 
			}).catch(e => console.log(e));
		}).catch(e => console.log(e));
	}
  	getProducts(){
  		UserService.getProducts().then(res => {
			res.json().then(resp => {
				if(resp.code === 200 && resp.data){
					// console.log(resp.data)
					this.setState({products:resp.data});
					console.log(this.state)
				} 
				// else if(resp.code === 401)
					// this.props.history.push('/logout');
				else 
					this.setState({alert:true,alertType:'danger',message:resp.message});
			}).catch(e => console.log(e));
		}).catch(e => console.log(e))
  	}
	getUserData(){
		UserService.getUserData().then(res => {
			res.json().then(resp => {
				if(resp.code === 200 && resp.data){
					let fields = {};
					for(var key in resp.data) fields[key] = resp.data[key];
					this.setState({fields});
				} 
				// else if(resp.code === 401)
					// this.props.history.push('/logout');
				else 
					this.setState({alert:true,alertType:'danger',message:resp.message});
			}).catch(e => console.log(e));
		}).catch(e => console.log(e))
	}
	render(){
		return (
			<div className={styles.Dashboard}>
				<Alert as="div" ref={this.alertref} show={this.state.alert} onClose={this.hideMessage} variant={this.state.alertType} dismissible>{this.state.message}</Alert>
    			<p><b>Username:</b> {this.state.fields['username']}</p>
    			<div className="col-lg-12 d-flex justify-content-center">
    				<Table striped bordered hover col={3}>
    					<thead>
    					<tr>
    						<th>S.No.</th>
    						<th>Product</th>
    						<th>Price</th>
    						<th>Action</th>
    					</tr>
    					</thead>
    					<tbody>
    						{
    							
    								this.state.products.map((pro,i) => (
    									<tr key={i}>
    										<td>{i+1}</td>
    										<td>{pro.product_name}</td>
    										<td>$ {parseFloat(pro.price).toFixed(2)}</td>
    										<td>
    											<Button onClick={()=>this.getProductInfo(pro._id)} data-id={pro._id} variant="success">View</Button>&nbsp;
    											<Button onClick={()=>this.addToCart(pro._id)} variant="primary">Add To Cart</Button>
    										</td>
    									</tr>
    								))
    							
    						}
    					</tbody>
    				</Table>
    			</div>
    			<div style={{display:this.state.showProduct['product_name']?'block':'none'}}>
    				<div>
    				<h4>Product Info</h4>
    				</div>
    				<div>
    				<Table striped bordered hover col={3}>
    					<tbody>
    					<tr>
    						<th>Product</th>
    						<td>{this.state.showProduct['product_name']}</td>
    					</tr>
    					<tr>
    						<th>Price</th>
    						<td>{this.state.showProduct['price']}</td>
    					</tr>
    					</tbody>
    				</Table>
    				</div>
    			</div>
    			<div>
    				<div><h5>My Carts</h5></div>
    				<div>
    					<Table striped bordered hover col={3}>
    						<thead>
    							<tr>
    								<th>S.No.</th>
    								<th>Product</th>
    								<th>Price</th>
    							</tr>
    						</thead>
    							<tbody>
    								{
    							
    								this.state.mycart.map((pro,i) => (
    									<tr key={i}>
    										<td>{i+1}</td>
    										<td>{pro.product_name}</td>
    										<td>$ {parseFloat(pro.price).toFixed(2)}</td>
    									</tr>
    								))
    							
    								}
    							</tbody>
    					</Table>
    				</div>
    				<div>
    					Total: $ {this.state.total}
    				</div>
    			</div>
  			</div>
		);
	}
}

export default Dashboard;
