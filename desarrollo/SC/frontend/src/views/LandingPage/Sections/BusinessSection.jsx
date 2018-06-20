import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component
// Styles for this component
import businessStyle from '../../../assets/jss/material-kit-react/views/landingPageSections/businessStyle';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import InfoArea from '../../../components/InfoArea/InfoArea'

// Sections for this component
import { businessData } from './content';

// Component class
class BusinessSection extends React.Component {
  render() {
    const { classes } = this.props;
    const { title, description, subBusinessInfo } = businessData;
    return (
      <div className={classes.section}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{title}</h2>
            <h5 className={classes.description}>
              {description}
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer justify='center'>
            {subBusinessInfo.map((business, idx) => (
              <GridItem key={idx} xs={12} sm={6} md={4}>
                <InfoArea
                  title={business.title}
                  description={business.description}
                  icon={business.icon}
                  iconColor={business.iconColor}
                  vertical
                />
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(businessStyle)(BusinessSection);
