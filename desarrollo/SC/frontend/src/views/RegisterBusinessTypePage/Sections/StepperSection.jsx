import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from '../../../assets/jss/material-kit-react/views/registerTypeSections/stepperSection';
import PlanForm from './PlanForm';
import { connect } from 'react-redux';
import Progress from '../../../components/Progress/Progress';
import GeneralForm from './GeneralForm';
import { setProduct, bacoStep, setGeneralInfo } from '../../../actions/businessActions';

function getSteps() {
  return ['Elegir plan', 'Llenar información general', 'Llenar información detallada', 'Confirmar Pago'];
}
const theme = createMuiTheme({
  pallete: {
    primary: { main: '#9c27b0' }
  }
});
class StepperSection extends React.Component {

  getStepContent(stepIndex) {
    const { business, dispatch } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <PlanForm
            currentPlan={business.currentPlan}
            dispatch={dispatch}
            plans={business.plans}
          />
        );
      case 1:
        return (
          <GeneralForm
            dispatch={dispatch}
            business={business}
          />
        );
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    const { form, business } = this.props;
    console.log(this.props);
    const { activeStep } = business;


    switch (activeStep) {
      case 0: {
        console.log('Guardar datos del producto');
        this.props.dispatch(setProduct());
        break;
      }
      case 1: {
        console.log('Guardar datos generales');
        const { generalForm: { values } } = form;
        this.props.dispatch(setGeneralInfo(values));
        break;
      }
      case 2: {
        console.log('Guardar datos especificos');
        break;
      }
      case 3: {
        console.log('Pagar');
        break;
      }
      default:
        console.log('faillll')
        break;
    }

  };

  handleBack = () => {
    this.props.dispatch(bacoStep());
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    // eslint-disable-next-line
    const { classes, dispatch, business } = this.props;
    const steps = getSteps();
    const { activeStep } = business;
    console.log('StepperSection ->', this.props)
    return (
      <MuiThemeProvider theme={theme}>
        <GridItem xs={12} sm={12} md={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </GridItem>
        <GridContainer justify='center'>
          {activeStep === steps.length ? (
            <GridContainer justify='center'>
              <Button onClick={this.handleReset}>Reset</Button>
            </GridContainer>
          ) : (
              <GridItem xs={12} sm={12} md={12}>
                <div className={classNames(classes.main, classes.mainRaised, classes.mainCenterContent)}>
                  {this.getStepContent(activeStep)}
                </div>
                <div className={classes.mainCenterContent}>
                  {/*<Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Atras
                  </Button>*/}
                  <Button disabled={!business.canNext} variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Pagar' : 'Siguiente'}
                  </Button>
                </div>
              </GridItem>
            )}
        </GridContainer>
        {business.loading && <Progress />}
      </MuiThemeProvider>
    );
  }
}

StepperSection.propTypes = {
  classes: PropTypes.object,
};

export default connect(state => state)(withStyles(styles)(StepperSection));
