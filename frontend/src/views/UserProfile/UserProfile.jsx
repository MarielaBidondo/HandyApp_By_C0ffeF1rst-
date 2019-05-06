import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import TextField from '@material-ui/core/TextField';

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
  }
};

class UserProfile extends React.Component {

	emptyItem = {
		serviceName: '',
		description: '',
		price: '',
		location: ''
	};

	validateItem = {
		serviceName: {
			id : 'serviceName',
			viewName : 'Service Name',
			invalid : false,
			errorMessage : ''
		},
		description: {
			id : 'description',
			viewName : 'Description',
			invalid : false,
			errorMessage : ''
		},
		price: {
			id : 'price',
			viewName : 'Price (€)',
			invalid : false,
			errorMessage : ''
		},
		location: {
			id : 'location',
			viewName : 'Location',
			invalid : false,
			errorMessage : ''
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			user : {},
			tableData: [],
			tableHeader : ["Service Type", "Rate(Hourly €)"],
			isLoggedInUser : false,
			item: this.emptyItem,
			validateItem : this.validateItem
		};
		
		let userLS = JSON.parse(localStorage.getItem('user'));
		if(userLS.userId === this.props.match.params.userId){
			this.state.isLoggedInUser = true;
		}
		
		this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
		this.handleAddServiceEvent = this.handleAddServiceEvent.bind(this);
		this.getUserService = this.getUserService.bind(this);
	}
	
	componentDidMount() {
	
		let user = {...this.state.user};
		let fetchURL = 'http://localhost:2700/api/users/'+ this.props.match.params.userId;
		
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
			user = data;
			this.setState({user});
			this.getUserService(user._id);
		}).catch(error => this.setState({ error, isLoading: false }));
		
		//fetch user services
		
		
	}
	
	getUserService(userId){
		
		fetch("http://localhost:2700/api/services/user/"+ userId , {
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
			let tableData = [...this.state.tableData];
			tableData = [];
			data.map((prop, key) => {
				var service = [];
				service.push(prop.serviceName);
				service.push(prop.price);
				tableData.push(service);
			});
			this.setState({tableData});
		})
		.catch(error => this.setState({ error, isLoading: false }));
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
	
	handleAddServiceEvent(event){
		
		event.preventDefault();
		let item  = {...this.state.item};
		let validateItem = {...this.state.validateItem};
		let _this = this;
		
		let successMessage = "Service added successfully!";
		let userLS = JSON.parse(localStorage.getItem('user'));
		item.user = {
			_id : userLS.userId,
		}
			
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'x-auth-token' : userLS.token
		}
		
		fetch("http://localhost:2700/api/services", {
			method: (item._id) ? 'PATCH' : 'POST',
			headers: headers,
			body: JSON.stringify(item),
		}).then(response => {
			return response.json();
		}).then(data => { 
			if(data.error){
				let errors = data.error.errors;
				for (const [id, value] of Object.entries(validateItem)) {
					if(errors[id]){
						validateItem[id].invalid = true;
						validateItem[id].errorMessage = errors[id].message.replace(validateItem[id].id, validateItem[id].viewName);
					}
				}
				_this.setState({validateItem});
			}else{
				_this.getUserService(item.user._id);	
				item = _this.emptyItem;
				_this.setState({item});
				alert(successMessage);
			}	
		}).catch(error => this.setState({ error, isLoading: false }));
		
		//item = this.emptyItem;
		//this.setState({item});
	}

	render() {
		const { classes } = this.props;
		let tableData = [...this.state.tableData];
		let tableHeader = [...this.state.tableHeader];
		const { item , validateItem } = this.state;
	return (
    <div>
      <GridContainer>
		 <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
			  <h4 className={classes.cardTitle}>{this.state.user.name}</h4>
			  <h6 style ={{ textTransform : "lowercase" }} className={classes.cardCategory}>{this.state.user.email}</h6>
              <h6 style ={{ textTransform : "lowercase" }} className={classes.cardCategory}>{this.state.user.address}</h6>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth ...
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Services Offer</h4>
            </CardHeader>
            <CardBody>
				<Table>
											<TableHead>
												<TableRow>
													{tableHeader.map((prop, key) => {
														return (
															<TableCell key={key} >
																{prop}
															</TableCell>
														);
													})}
												</TableRow>
											</TableHead>
											<TableBody>
												{tableData.map((prop, key) => {
													return (
														<TableRow key={key}>
															{prop.map((prop, key) => {
																return (
																	<TableCell key={key}>
																		{prop}
																	</TableCell>
																);
															})}
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
			</CardBody>
			{!this.state.isLoggedInUser && <CardFooter>
              <Button color="primary">Hire Me</Button>
            </CardFooter> }
          </Card>
        </GridItem>
        { !this.state.isLoggedInUser && <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Sent Message</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Contact me</InputLabel>
                  <CustomInput
                    labelText="Let me know what you need?"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Sent</Button>
            </CardFooter>
          </Card>
        </GridItem>}
		{ this.state.isLoggedInUser && <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Service</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.serviceName.invalid}
											required = "true"
											id="serviceName"
											label= {validateItem.serviceName.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.serviceName.errorMessage}
											fullWidth
											value= {item.serviceName}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.price.invalid}
											required = "true"
											id="price"
											label= {validateItem.price.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.price.errorMessage}
											fullWidth
											type = "number"
											value= {item.price}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.location.invalid}
											required = "true"
											id="location"
											label= {validateItem.location.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.location.errorMessage}
											fullWidth
											value= {item.location}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											error = {validateItem.description.invalid}
											required = "true"
											id="description"
											label= {validateItem.description.viewName}
											margin="normal"
											onChange = {this.handleOnChangeEvent}
											helperText = {validateItem.description.errorMessage}
											fullWidth
											value= {item.description}
										/>
									</GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick = {this.handleAddServiceEvent}>Add Service</Button>
            </CardFooter>
          </Card>
        </GridItem>}
      </GridContainer>
    </div>
  );
  
  }
}

export default withStyles(styles)(UserProfile);