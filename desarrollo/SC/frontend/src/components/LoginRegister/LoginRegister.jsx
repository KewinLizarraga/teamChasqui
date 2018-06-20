import React from 'react';

// Thrid party library used by this component.
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// Components used by this component
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import IconButton from '../../components/CustomButtons/IconButton';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../components/LoginRegister/LoginRegisterForm';
import Progress from '../../components/Progress/Progress';
// Styles for this component
import loginPageStyle from '../../assets/jss/material-kit-react/views/loginPage';
// Sections for this component
import image from '../../assets/img/login_bg.jpg';
// Component class
import { loginData, registerData } from './fieldsData';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: 'cardHidden'
    }
  }
  componentDidMount = () => {
    setTimeout(function () {
      this.setState({ cardAnimaton: '' });
    }.bind(this), 0);
  }
  renderSocialIcons = (icons) => {
    return icons.map(icon => (
      <IconButton
        key={icon.id}
        href={icon.to}
        target="_blank"
        color="transparent"
      >
        <i className={this.props.classes.socialIcons + icon.icon} />
      </IconButton>
    ));
  }
  render() {
    const { classes, history, type, auth: { error }, dispatch } = this.props;
    const data = type === 'login' ? loginData : registerData;
    const { title, socialIcons } = data;
    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={9} md={7} lg={5} xl={10}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader color='primary' className={classes.cardHeader}>
                  <h4 className={classes.title}>{title}</h4>
                  <div className={classes.socialLine}>
                    {this.renderSocialIcons(socialIcons)}
                  </div>
                </CardHeader>
                <LoginRegisterForm type={type} history={history} data={data} classes={classes} />
              </Card>
            </GridItem>
          </GridContainer>
          <Footer whiteFont />
        </div>
        {this.props.auth.isLoading && (
          <Progress />
        )}
        <CustomSnackbar
          open={!!error}
          message={error && (error.message || '')}
          dispatch={dispatch}
        />
      </div>
    )
  }
}

// ProtTypes for this component
LoginRegister.defaultProps = {
  type: 'login'
};
// Export component
export default connect(({ auth }) => ({ auth }))(withStyles(loginPageStyle)(LoginRegister));
