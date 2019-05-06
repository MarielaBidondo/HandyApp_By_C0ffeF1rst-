import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



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

class Service extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			tableHeader : [],
		};
		
		this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
		this.handleSeeProfileEvent = this.handleSeeProfileEvent.bind(this);
		
	}
	
	componentDidMount() {
		
		let tableHeader = [...this.state.tableHeader];
		
		if(this.props.dashborad){
			tableHeader = ["Name", "Service", "Price", "Location"];
		}else{
			tableHeader = ["Name", "Service", "Price", "Location", "Action"];
		}
		
		this.setState({tableHeader});
		
		
		fetch('http://localhost:2700/api/services', {
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
			data.map((prop) => {
				
				var service = [];
				service.push(prop.user.name);
				service.push(prop.serviceName);
				service.push(prop.price);
				service.push(prop.location);
				if(!this.props.dashborad){
					service.push(prop.user._id);
				}
				tableData.push(service);
			});
			this.setState({tableData});
		}).catch(error => this.setState({ error, isLoading: false }));
	}
	
	handleOnChangeEvent(event){
		event.preventDefault();
		const target = event.target;
		const valueParam = target.value.trim();
		
		let fetchURL = "http://localhost:2700/api/services";
		if(valueParam){
			fetchURL = 'http://localhost:2700/api/services/find/' +valueParam;
		}
		
		fetch(fetchURL , {
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
			data.map((prop) => {
				
				var service = [];
				service.push(prop.user.name);
				service.push(prop.serviceName);
				service.push(prop.price);
				service.push(prop.location);
				if(!this.props.dashborad){
					service.push(prop.user._id);
				}
				tableData.push(service);
			});
			this.setState({tableData});
		})
		.catch(error => this.setState({ error, isLoading: false }));
	}
	
	handleSeeProfileEvent(event){
		event.preventDefault();
		let userId = event.currentTarget.getAttribute("data-userid");
		let path = 'user/' + userId;
		this.props.history.push(path);
	}

	render() {
		let tableData = [...this.state.tableData];
		let tableHeader = [...this.state.tableHeader];
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<Card>
							<CardBody>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											fullWidth
											id="searchService"
											label= "Search Service"
											margin="normal"
											onChange = {this.handleOnChangeEvent}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
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
																if(key === 4 && !this.props.dashborad){
																	return (
																		<TableCell key={key}>
																			<Button data-userId={prop} onClick = {this.handleSeeProfileEvent} color="primary" round> See Profile </Button>
																		</TableCell>
																	);
																} else {
																	return (
																		<TableCell key={key}>
																			{prop}
																		</TableCell>
																	);
																}
															})}
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</GridItem>
								</GridContainer>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default withStyles(styles)(Service);
