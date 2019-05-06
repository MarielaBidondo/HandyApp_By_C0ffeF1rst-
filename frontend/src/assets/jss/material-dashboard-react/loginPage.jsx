import { container } from "assets/jss/material-dashboard-react.jsx";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    color: "#000",
	height: "calc(100vh - 86px)",
  },
  header: {
	margin: "0",  
  },
  headerH4: {
	margin: "0",
	textAlign: "center",
    paddingTop: "3vh",
    fontSize: "6vw",
	fontStyle: "italic",
    fontFamily: "cursive",
    fontWeight: "bold"
  },
  headerH3: {
	fontSize: "1vw",
    textAlign: "center",
    width: "50%",
    margin: "0 auto",
	fontStyle: "italic",
  },
  buttonCenter:{
	textAlign : "center !important" ,
  },
  loginForm:{
	width: "80%",
    margin: "0 auto",
	textAlign: "center",
	paddingTop: "calc(100% - 300px)"
  },
  backGroundLogo:{
	minWidth: "65vh",
    minHeight: "64vh",
    backgroundSize: "100% 100%",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "100vh",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(F, F, F, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: "#495057"
  }
};

export default signupPageStyle;
