import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
import { connect } from 'react-redux';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component
import Parallax from '../../components/Parallax/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Footer from '../../components/Footer/Footer';
// Styles for this component
import styles from '../../assets/jss/material-kit-react/views/landingPage';
// Sections for this component
import { data } from './content';
import RegisterSection from './Sections/RegisterSection';
import { loggedIn } from '../../services/AuthService';
import { setBusinessType } from '../../actions/businessActions';
import HeaderLinks from '../../components/Header/HeaderLinks';
import Header from '../../components/Header/Header';

const possiblyParams = ['hotel', 'restaurant', 'travel_agency'];
// Component class
class RegisterBusinessTypePage extends React.Component {
  componentWillMount = () => {
    const { businessType } = this.props.match.params;

    if (possiblyParams.indexOf(businessType) === -1) {
      this.props.history.replace('/notFound');
    }
    if (!loggedIn()) {
      this.props.history.replace('/login');
    }

    this.props.dispatchSetBusinessType(businessType)
  }

  render() {
    const { classes } = this.props;
    const { businesses } = data;
    const { businessType } = this.props.match.params;
    return (
      <div>
        <Header
          color="transparent"
          brand={process.env.REACT_APP_BRAND || 'Tinkuy'}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: 'white'
          }}
        />
        <Parallax filter image={require('../../assets/img/register_business_bg.jpg')}>
          <div className={classes.container}>
            <GridContainer >
              <GridItem xs={12} sm={12} md={12}>
                <h1 className={classes.title}>{`Registra tu ${businesses[businessType]}`}</h1>
                <h4>Solo siguiendo los pasos de abajo podras registrar tu {businesses[businessType]} y hacer que todo el mundo lo vea.</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <RegisterSection />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

// ProtTypes for this component

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchSetBusinessType: businessType => {
    dispatch(setBusinessType(businessType));
  } 
});

// Export component
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegisterBusinessTypePage));
