import {
  blackColor,
  whiteColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.jsx";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "0px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    background: whiteColor,
    width: "100%",
    boxShadow: "none",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
	padding: "0px 14px !important",
	height: "100%",
	borderRight: "1px solid #eee",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center"
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px"
    }
  }
};

export default cardStyle;
