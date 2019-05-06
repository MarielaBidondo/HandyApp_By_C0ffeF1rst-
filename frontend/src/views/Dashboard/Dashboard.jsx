import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import Service from "views/Service/Service.jsx";

import avatar from "assets/img/faces/marc.jpg";

import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";


class Dashboard extends Component {

	emptyUser = { 
        name: '',
        dateOfBirth: '',
        address: '',
        phone: '',
        email: '',
    };
	

	constructor(props){
		super(props);
		this.state = {
			user: this.emptyUser
		};
		
		this.handleEditProfileEvent = this.handleEditProfileEvent.bind(this);
	}
	
	componentDidMount() {
		let user = {...this.state.user};
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
				user = data;
				this.setState({user});
			}).catch(error => this.setState({ error, isLoading: false }));
		}
	}
	
	handleEditProfileEvent(){
		let path = 'updateProfile';
		this.props.history.push(path);
	}

	render() {
  const { classes } = this.props;
  let user = {...this.state.user};
  return (
    <div>
      <GridContainer>
		<GridItem style={{ padding: "0px"}} xs={12} sm={12} md={5}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile style={{ flex: "unset"}}>
				<h4  className={classes.cardTitle} style={{ margin: "5px"}}>{user.name}</h4>
				<Button onClick={this.handleEditProfileEvent} color="primary" round>
					Edit Profile
				</Button>
            </CardBody>
			<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
            <Card style={{ height: "auto", borderRight: "none"}}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Inbox</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Sender", "Message"]}
                  tableData={[
                    ["Carolina", "Hellow world"],
                    ["Nadeska", "Hellow world"],
                    ["Leticia", "Hellow world"],
                    ["Mariela", "Hellow world"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
			</GridContainer>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardBody>
              <Service dashborad></Service>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
  }
}

export default withStyles(tableStyle)(Dashboard);
