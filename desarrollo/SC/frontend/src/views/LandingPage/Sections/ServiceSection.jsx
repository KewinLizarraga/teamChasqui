import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
// Styles for this component
import serviceStyle from '../../../assets/jss/material-kit-react/views/landingPageSections/serviceStyle';
// Sections for this component
import { serviceData } from './content';

// Component class
class ServiceSection extends React.Component {
  render() {
    const { title, servicesInfo } = serviceData;
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>{title}</h2>
        <div>
          <GridContainer >
            {servicesInfo.map(service => (
              <GridItem key={service.id} xs={12} sm={6} md={4}>
                <Card plain>
                  <div>
                    <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                      <img src={service.img} alt='...' className={imageClasses} />
                    </GridItem>
                    <h4 className={classes.cardTitle}>
                      {service.title}
                    </h4>
                  </div>
                  <CardBody>
                    <p className={classes.description}>
                      {service.description}
                    </p>
                  </CardBody>
                </Card>
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
export default withStyles(serviceStyle)(ServiceSection);
