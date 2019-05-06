import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import Hidden from "@material-ui/core/Hidden";
import Power from "@material-ui/icons/PowerSettingsNew";
import Button from "components/CustomButtons/Button.jsx";

class HeaderLinks extends Component {

	constructor(props) {
		super(props);
		this.handleLogOutButtonEvent = this.handleLogOutButtonEvent.bind(this);
	}

	state = {
		open: false
	};
	
	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};
	
	handleLogOutButtonEvent(){
	
		localStorage.removeItem('user');
	
		let path = '/login';
		this.props.history.push(path);
	}
  
	render() {
	const { classes } = this.props;
  
  
    return (
      <div>
		<Button onClick={this.handleLogOutButtonEvent} type="submit"
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Power"
          className={classes.buttonLink}
        >
          <Power className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
	  </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
