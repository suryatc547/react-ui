import React from 'react';
// import PropTypes from 'prop-types';
import {Form,Button,Alert} from 'react-bootstrap';
import styles from './AddProduct.module.css';
import UserService from '../../services/UserService.js';

class AddProduct extends React.Component {
	constructor(props){
		super(props);
		this.state = {fields:{},errors:{},alert:false,alertType:'danger',message:''};
		this.submitHandler = this.submitHandler.bind(this);
		this.updateField = this.updateField.bind(this);
		this.validator = this.validator.bind(this);
		this.hideMessage = this.hideMessage.bind(this);
		this.alertref = React.createRef();
		document.title = 'AddProduct';
	}
	hideMessage(){
		this.setState({alert:false});
	}
	render() { 
	return	(
  	<div className={styles.AddProduct}>
  		<div className="d-flex justify-content-center">
    		<Form className="col-lg-4 mt-5" onSubmit={this.submitHandler.bind(this)}>
    			<Alert as="div" ref={this.alertref} show={this.state.alert} onClose={this.hideMessage} variant={this.state.alertType} dismissible>{this.state.message}</Alert>
     			<Form.Group className="text-left">
     				<Form.Label>product_name</Form.Label>
     				<Form.Control id="product_name" name="product_name" type="text" onChange={this.updateField} />
     				<label style={{display:this.state.errors['product_name']?'block':'none'}} className="error">{this.state.errors['product_name']}</label>
     			</Form.Group>
     			<Form.Group className="text-left">
     				<Form.Label>price</Form.Label>
     				<Form.Control id="price" name="price" type="text" onChange={this.updateField} />
     				<label style={{display:this.state.errors['price']?'block':'none'}} className="error">{this.state.errors['price']}</label>
     			</Form.Group>
     			<Form.Group className="text-center">
     				<Button type="submit">Add</Button>
     			</Form.Group>
   		 	</Form>
   		</div>
    </div>
	);
	}
	updateField(e){
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.validator();
		this.setState({fields});
	}
	submitHandler(e){
		e.preventDefault();
		if(this.validator()){
			UserService.addProduct(this.state.fields).then((res)=>{
				res.json().then(resp => {
					if(resp.code === 200){
						this.setState({alert:true,alertType:'success',message:resp.message});
						setTimeout(() => {
							this.props.history.push('/dashboard');
						},1000);
					} else if(resp.code === 400) {
						let errors = {};
						for(var key in resp.data) errors[key] = resp.data[key][0];
						this.setState({errors:errors});
					} else 
						this.setState({alert:true,alertType:'danger',message:resp.message});
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		}
		console.log(this.state.fields)
	}
	validator(){
		let fields = this.state.fields;
		let errors = this.state.errors;

		if(!fields['product_name']) errors['product_name'] = "Please enter product name";
		else errors['product_name'] = '';

		if(!fields['price']) errors['price'] = "Please enter price";
		else if(isNaN(fields['price']) && fields['price'] > 0) 
			errors['price'] = "Please enter valid price";
		else errors['price'] = '';

		this.setState(errors);
		console.log(this.state);
		return !errors['product_name'] && !errors['price'];
	}
}

export default AddProduct;