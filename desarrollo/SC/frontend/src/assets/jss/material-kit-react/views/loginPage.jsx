import { container, title, primaryColor } from '../../material-kit-react';

const signupPageStyle = {
  title: {
    ...title,
    color: 'white',
    margin: '1rem 0 0.875rem'
  },
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.65)"
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
    marginBottom: "15px",
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
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  centerItem: {
    display: 'flex',
    justifyContent: 'center'
  },
  aClasses: {
    color: primaryColor,
    marginBottom: '10px',
    '&:hover, &:focus': {
      color: primaryColor,
      fontSize: '15px'
    }
  },
  progress: {
    zIndex: 6,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    top: '0',
    left: '0',
    right: '0',
    margin: '0 auto',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  }
  
};

export default signupPageStyle;
