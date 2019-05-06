import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import CoffeeFirstLogo from "assets/img/CoffeeFirstLogo.jpg";
function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer style={{ textAlign : "right"}}>
      <div className={classes.container}>
        <p>
          <img src={`${CoffeeFirstLogo}`} style={{ width : "8vw" , height : "4vw"}}></img>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
