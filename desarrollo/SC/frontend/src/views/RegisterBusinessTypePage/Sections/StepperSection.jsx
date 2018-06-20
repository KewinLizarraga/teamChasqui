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
function getSteps() {
  return ['Elegir plan', 'Llenar información general', 'Llenar información detallada', 'Confirmar Pago'];
}


const theme = createMuiTheme({
  pallete: {
    primary: { main: '#9c27b0' }
  }
})
class StepperSection extends React.Component {
  state = {
    activeStep: 1,
  };

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
          <GeneralForm />
        );
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    console.log(this.props)

    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
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
    const { activeStep } = this.state;
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
          {this.state.activeStep === steps.length ? (
            <GridContainer justify='center'>
              <Button onClick={this.handleReset}>Reset</Button>
            </GridContainer>
          ) : (
              <GridItem xs={12} sm={12} md={12}>
                <div className={classNames(classes.main, classes.mainRaised, classes.mainCenterContent)}>
                  {this.getStepContent(this.state.activeStep)}
                </div>
                <div className={classes.mainCenterContent}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Atras
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
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
