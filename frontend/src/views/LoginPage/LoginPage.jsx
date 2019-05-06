import React from "react";
import Helmet from 'react-helmet';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// core components
import LoginFooter from "components/LoginFooter/LoginFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import loginPageStyle from "assets/jss/material-dashboard-react/loginPage.jsx";

import image from "assets/img/logoBackground.jpg";
import welcomeImage from "assets/img/Welcome.jpg";

class LoginPage extends React.Component {

	emptyItem = {
		email: '',
		password: ''
	};
	
	validateItem = {
		email: { 
			invalid : false,
			errorMessage : ''
		},
		password: { 
			invalid : false,
			errorMessage : ''
		}
	}

	
	constructor(props) {
		super(props);
		// we use this to make the card to appear after the page has been rendered
		this.state = {
			item: this.emptyItem,
			cardAnimaton: "cardHidden",
			validateItem : this.validateItem
		};
		this.handleRegisterButtonEvent = this.handleRegisterButtonEvent.bind(this);
		this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
		this.handleLoginSubmitEvent = this.handleLoginSubmitEvent.bind(this);
		this.validateOthers = this.validateOthers.bind(this);
	}
	
	componentDidMount() {
	
		let user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			let path = 'admin/dashboard';
			this.props.history.push(path);
		}
	
		// we add a hidden class to the card and after 700 ms we delete it and the transition appears
		setTimeout(
			function() {
				this.setState({ cardAnimaton: "" });
			}.bind(this),
		700
		);
	}
  
	handleRegisterButtonEvent(){
		let path = 'register';
		this.props.history.push(path);
	}
	
	handleOnChangeEvent(event){
		const target = event.target;
		const value = target.value.trim();
		const id = target.id;
		let item = {...this.state.item};
		item[id] = value;
		this.setState({item});
		
		let validateItem = {...this.state.validateItem};
		if(!value){
			validateItem[id].invalid = true;
			validateItem[id].errorMessage = id + " required";
		}else{
			validateItem[id].invalid = false;
			validateItem[id].errorMessage = "";
		}
		
		this.validateOthers(id, validateItem);
	}
	
	validateOthers(validatedItemId, validateItem){
		let item = {...this.state.item};
		
		for (const [id, value] of Object.entries(item)) {
			if(id !== validatedItemId && validateItem[id].invalid){
				if(!value){
					validateItem[id].invalid = true;
					validateItem[id].errorMessage = id + " required";
				}else{
					validateItem[id].invalid = false;
					validateItem[id].errorMessage = "";
				}
			}
		}
	}
	
	async handleLoginSubmitEvent(event){
		
		this.setState({ isLoading: true });
		
		event.preventDefault();
		const {item} = this.state;
		let validateItem = {...this.state.validateItem};
		let _this = this;
		await fetch('http://localhost:2700/api/auth', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item),
		}).then(response => {
			return response.json();
		}).then( object => {
		
			if(object.error){
				if(object.error.match("email") && object.error.match("password")){
					validateItem.email.invalid = true;
					validateItem.password.invalid = true;
					validateItem.password.errorMessage = object.error;
				}else if(object.error.match("email")){
					validateItem.email.invalid = true;
					validateItem.email.errorMessage = object.error;
				}else if(object.error.match("password")){
					validateItem.password.invalid = true;
					validateItem.password.errorMessage = object.error;
				}
				_this.setState({validateItem});
			}else{
				localStorage.setItem('user', JSON.stringify(object));
				let path = 'admin/dashboard';
				this.props.history.push(path);
			}
		}).catch(error => {
			this.setState({ error, isLoading: false })
		});
	}
  
  render() {
    const { classes } = this.props;
	const { validateItem } = this.state;
    return (
      <div>
		<div
          className={classes.pageHeader}
        >
		  <Helmet>
            <style>{'body { background-color: white; }'}</style>
          </Helmet>
          <div className={classes.container}>
			<div className={classes.header}>
				<div style={{ textAlign : "center", paddingTop : "3vh",}}>
					<img src={`${welcomeImage}`} style={{ width : "28vw" , height : "8vw"}}></img>
				</div>
				<h3 className={classes.headerH3}>Have some free time and want to help your community? Welcome to HandyApp! a secure and friendly space to connect people where you can exchange, trade or volunteer basic services like housework, electrical, gardening, baking and more!</h3>
			</div>
			
            <GridContainer justify="center">
			  <GridItem xs={4} sm={4} md={4} justify="center">
				<div className={classes.backGroundLogo}>
					<img src={`${image}`} style={{ width : "31.7vw" , height : "31.7vw"}}></img>
				</div>
			  </GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <GridContainer justify="center">
				<div className={classes.loginForm}>
				<GridItem xs={12} sm={12} md={12}>
					<TextField style={{ width : "100%" }}
						error = {validateItem.email.invalid}
						id="email"
						label="Email"
						margin="normal"
						onChange = {this.handleOnChangeEvent}
						helperText = {validateItem.email.errorMessage}
					/>
				</GridItem>
				<GridItem xs={12} sm={12} md={12}>
					<TextField style={{ width : "100%" }}
						error = {validateItem.password.invalid}
						id="password"
						label="Password"
						margin="normal"
						onChange = {this.handleOnChangeEvent}
						helperText = {validateItem.password.errorMessage}
						type = "password"
					/>
                </GridItem>
				<GridContainer justify="center">
					<GridItem className={classes.buttonCenter} xs={12} sm={12} md={12}>
						<Button onClick={this.handleLoginSubmitEvent}  color="primary" style={{ width : "80%" }}>Login</Button>
					</GridItem>
				</GridContainer>
				<GridContainer justify="center">
					<GridItem className={classes.buttonCenter} xs={12} sm={12} md={12}>
						<Button onClick={this.handleRegisterButtonEvent} color="primary" style={{ width : "80%" }}>Register</Button>
					</GridItem>
				</GridContainer>
				</div>
				</GridContainer>
              </GridItem>
            </GridContainer>
			 
          </div>
          <LoginFooter whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
