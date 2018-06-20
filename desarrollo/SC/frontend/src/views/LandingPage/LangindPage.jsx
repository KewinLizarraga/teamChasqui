import React from 'react';

// Thrid party library used by this page.
import classNames from 'classnames';

// Materias-ui components and functions used by this page.
import { withStyles } from '@material-ui/core/styles';

// Components used by this page
import Parallax from '../../components/Parallax/Parallax';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Footer from '../../components/Footer/Footer';
// Styles for this page
import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPage';

// Sections for this page
import BusinessSection from './Sections/BusinessSection';
import ServiceSection from './Sections/ServiceSection';
import DownloadSection from './Sections/DownloadSection';

//utils
import content from './content';

// Page class
class LandingPage extends React.Component {
  render() {
    const { title, description } = content;
    const { classes } = this.props;
    return (
      <div>
        <Parallax filter image={require('../../assets/img/landing_bg.jpg')}>
          <div className={classes.container}>
            <GridContainer >
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{title}</h1>
                <h4>{description}</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <BusinessSection />
            <ServiceSection />
            <DownloadSection />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

// ProtTypes for this page

// Export
export default withStyles(landingPageStyle)(LandingPage);
