import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  right:{
	float:"right",
  }
};

class UserProfile extends Component {

	emptyItem = {
		name: '',
		address: '',
		dateOfBirth: '',
		phone: '',
		email: '',
		password: '',
		rePassword : ''
	};
	
	validateItem = {
		name: {
			id : 'name',
			viewName : 'Name',
			invalid : false,
			errorMessage : ''
		},
		address: {
			id : 'address',
			viewName : 'Address',
			invalid : false,
			errorMessage : ''
		},
		dateOfBirth: {
			id : 'dateOfBirth',
			viewName : 'Date of Birth',
			invalid : false,
			errorMessage : ''
		},
		phone: {
			id : 'phone',
			viewName : 'Phone',
			invalid : false,
			errorMessage : ''
		},
		email: {
			id : 'email',
			viewName : 'Email',
			invalid : false,
			errorMessage : ''
		},
		password: {
			id : 'password',
			viewName : 'Password',
			invalid : false,
			errorMessage : ''
		},
		rePassword : {
			id : 'rePassword',
			viewName : 'Re enter password',
			invalid : false,
			errorMessage : ''
		}
	}
	
	constructor(props){
		super(props);
		this.state = {
			item: this.emptyItem,
			validateItem : this.validateItem
		};
		this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
		this.validateOthers = this.validateOthers.bind(this);
		this.handleRegisterSubmitEvent = this.handleRegisterSubmitEvent.bind(this);
		this.handleCancelEvent = this.handleCancelEvent.bind(this);
		this.handleServiceEvent = this.handleServiceEvent.bind(this);
	}
	
	componentDidMount() {
		
		let item = {...this.state.item};
		let userLS = JSON.parse(localStorage.getItem('user'));
		
		if(userLS){
			let fetchURL = 'http://localhost:2700/api/users/' + userLS.userId;
			fetch(fetchURL, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong ...');
				}
			}).then(data => {
				item = data;
				this.setState({item});
			}).catch(error => this.setState({ error, isLoading: false }));
		}
	}
	
	handleOnChangeEvent(event){
		const target = event.target;
		const value = target.value;
		const id = target.id;
		let item = {...this.state.item};
		item[id] = value;
		this.setState({item});
		
		let validateItem = {...this.state.validateItem};
		if(!value.trim()){
			validateItem[id].invalid = true;
			validateItem[id].errorMessage = validateItem[id].viewName + " required";
		}else{
			validateItem[id].invalid = false;
			validateItem[id].errorMessage = "";
		}
		
		this.validateOthers(id, validateItem);
	}
	
	validateOthers(validatedItemId, validateItem){
		let item = {...this.state.item};
		
		for (const [id, value] of Object.entries(item)) {
			if(id !== validatedItemId && validateItem[id]){
				if(validateItem[id].invalid){
					if(!value){
						validateItem[id].invalid = true;
						validateItem[id].errorMessage = validateItem[id].viewName + " required";
					}else{
						validateItem[id].invalid = false;
						validateItem[id].errorMessage = "";
					}
				}
			}
		}
	}
	
	async handleRegisterSubmitEvent(event){
		
		this.setState({ isLoading: true });
		
		event.preventDefault();
		const {item} = this.state;

		let validateItem = {...this.state.validateItem};
		let _this = this;

		delete item.rePassword;
		let successMessage = "User added successfully!";
		let fetchURL = 'http://localhost:2700/api/users';
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
		if(item._id){
			successMessage = "User updated successfully!";
			let userLS = JSON.parse(localStorage.getItem('user'));
			
			headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-auth-token' : userLS.token
			}
			
			fetchURL += '/' + item._id;
		}
		
		fetch(fetchURL, {
			method: (item._id) ? 'PATCH' : 'POST',
			headers: headers,
			body: JSON.stringify(item),
		}).then(response => {
			return response.json();
		}).then(data => { 
			if(data.error){
				let tempId;
				for (const [id, value] of Object.entries(validateItem)) {
					if(data.error.match(value.id)){
						tempId = id;
					}
				}
				if(tempId){
					validateItem[tempId].invalid = true;
					validateItem[tempId].errorMessage = data.error.replace(validateItem[tempId].id, validateItem[tempId].viewName);
				}else{
					validateItem.email.invalid = true;
					validateItem.email.errorMessage = data.error;
				}
				
				_this.setState({validateItem});
			}else{
				alert(successMessage);
				setTimeout( function() {
					this.handleCancelEvent();
				}.bind(this), 200 );
			}	
		}).catch(error => this.setState({ error, isLoading: false }));
		
		
	}
	
	handleCancelEvent(){
		let path = '';
		this.props.history.push(path);
	}
	
	handleServiceEvent(){
		let userLS = JSON.parse(localStorage.getItem('user'));
		let path = 'user/'+userLS.userId;
		this.props.history.push(path);
	}
	
	render() {
		const { classes } = this.props;
		const { item , validateItem } = this.state;
		return (
			<div>
				<GridContainer justify="center">
					<GridItem xs={12} sm={12} md={3}>
						<Card profile>
							<CardAvatar profile style={{margin : "15px auto 0"}}>
								<a href="#pablo" onClick={e => e.preventDefault()}>
									<img src={avatar} alt="..." />
								</a>
							</CardAvatar>
							<CardBody profile>
								<Button color="primary" round>
									Upload
								</Button>
							</CardBody>
						</Card>
					</GridItem>
					<GridItem xs={12} sm={12} md={5}>
						<Card>
							<CardBody>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.name.invalid}
											fullWidth
											required = "true"
											id="name"
											label= {validateItem.name.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.name.errorMessage}
											value= {item.name}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.dateOfBirth.invalid}
											required = "true"
											id="dateOfBirth"
											label= {validateItem.dateOfBirth.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.dateOfBirth.errorMessage}
											fullWidth
											value= {item.dateOfBirth}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.address.invalid}
											required = "true"
											id="address"
											label= {validateItem.address.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.address.errorMessage}
											fullWidth
											value= {item.address}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.phone.invalid}
											required = "true"
											id="phone"
											label= {validateItem.phone.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.phone.errorMessage}
											fullWidth
											value= {item.phone}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.email.invalid}
											required = "true"
											id="email"
											label= {validateItem.email.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.email.errorMessage}
											fullWidth
											value= {item.email}
										/>
									</GridItem>
									{ !item._id && <GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.password.invalid}
											required = "true"
											id="password"
											type="password"
											label= {validateItem.password.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.password.errorMessage}
											fullWidth
										/>
									</GridItem> }									
								</GridContainer>
							</CardBody>
							<CardFooter justify="right" style={{ float : "right", display : "table-cell"}}>
								<Button className={classes.right} color="primary" onClick={this.handleRegisterSubmitEvent}>{ item._id ? 'Update' : 'Register'}</Button>
								<Button className={classes.right} color="primary" onClick={this.handleCancelEvent}>Cancel</Button>
								{ item._id &&  <Button className={classes.right} color="primary" onClick={this.handleServiceEvent}>Manage Service</Button> }						
							</CardFooter>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default withStyles(styles)(UserProfile);
