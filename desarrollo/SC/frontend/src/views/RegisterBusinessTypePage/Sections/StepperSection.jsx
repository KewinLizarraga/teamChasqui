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
import { setProduct, bacoStep, setGeneralInfo, setDetailedInfo } from '../../../actions/businessActions';
import DetailedForm from './DetailedForm/DetailedForm';
import PaymentConfirmation from './PaymentConfirmation/PaymentConfirmation';
import Payments from '../../../components/Payments/Payments';

function getSteps() {
  return ['Elegir plan', 'Llenar información general', 'Llenar información detallada', 'Confirmar Pago'];
}
const theme = createMuiTheme({
  pallete: {
    primary: { main: '#9c27b0' }
  }
});
const arrayToState = (data, options) => {
  return data.map(value => ({
    id: value,
    name: options[value]
  }));
}
const mapDataToValues = (business, form) => {
  const {
    businessType,
    currentImage,
    currentMoneyTypes,
    currentServices,
    moneyTypes,
    hotelServices
  } = business;
  const { detailedForm } = form;
  const specificForm = form[`${businessType}Form`];
  switch (businessType) {
    case 'hotel': {
      const detailedFormValues = detailedForm.values;
      const specificFormValues = specificForm.values;
      const { checkin_time, checkout_time } = specificFormValues;
      const money_types = arrayToState(currentMoneyTypes, moneyTypes);
      const services = arrayToState(currentServices, hotelServices);
      const hotel_detail = Object.assign({}, specificFormValues, {
        checkin_time: checkin_time.format('LT'),
        checkout_time: checkout_time.format('LT'),
        services
      });
      const { price_max, price_min, ...business } = detailedFormValues;
      return {
        business: {
          ...business,
          price: {
            min: Number(price_min),
            max: Number(price_max),
            average: (price_min + price_max) / 2
          },
          money_types,
          photos: [currentImage]
        },
        hotel_detail,
      }
    }
    default: {
      return {}
    }
  }
}
class StepperSection extends React.Component {

  getStepContent(stepIndex) {
    const { business, dispatch } = this.props;
    const {
      canNext,
      completed,
      businessType,
      moneyTypes,
      currentMoneyTypes,
    } = business;
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
        return (
          <DetailedForm
            canNext={canNext}
            completed={completed}
            businessType={businessType}
            moneyTypes={moneyTypes}
            currentMoneyTypes={currentMoneyTypes}
          />
        )
      case 3:
        return (
          <PaymentConfirmation />
        )
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    const { form, business } = this.props;
    const {
      activeStep,
    } = business;

    switch (activeStep) {
      case 0: {
        console.log('Guardar datos del producto');
        this.props.dispatch(setProduct());
        break;
      }
      case 1: {
        console.log('Guardar datos generales');
        const { generalForm: { values } } = form;
        const { currentLocation } = business;
        this.props.dispatch(setGeneralInfo(values, currentLocation));
        break;
      }
      case 2: {
        console.log('Guardar datos especificos');
        const values = mapDataToValues(business, form);
        this.props.dispatch(setDetailedInfo(values));
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

  isDisabled = () => {
    const { canNext, completed } = this.props.business;
    if (completed === null)
      return canNext;
    else
      return completed && canNext
  }
  render() {
    // eslint-disable-next-line
    const { classes, dispatch, business } = this.props;
    const steps = getSteps();
    const { activeStep } = business;
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
                  {activeStep === steps.length - 1 ? (
                    <Payments />
                  ) : (
                      <Button disabled={!this.isDisabled()} variant="contained" color="primary" onClick={this.handleNext}>
                        Siguiente
                    </Button>
                    )}
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
