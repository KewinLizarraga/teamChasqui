import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// Materias-ui components and functions used by this component.

// Components used by this component
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
// Styles for this component
import registerSectionStyle from '../../../assets/jss/material-kit-react/views/registerTypeSections/registerSection';
import { withStyles } from '@material-ui/core';
// Sections for this component
import StepperSection from './StepperSection';
// Component class
class RegisterSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.title}>Regístrese</h2>
            <h4 className={classes.description}>
              Siga todo los pasaos y llene todo los campos con la información de su negocio.
            </h4>
          </GridItem>
          <GridItem md={12}>
            <div className={classNames(classes.main)}>
              <div className={classes.container}>
                <StepperSection />
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(registerSectionStyle)(RegisterSection);
