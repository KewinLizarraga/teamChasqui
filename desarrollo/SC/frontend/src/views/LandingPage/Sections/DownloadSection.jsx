import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Button from '../../../components/CustomButtons/Button';

// Styles for this component
import downloadStyle from '../../../assets/jss/material-kit-react/views/landingPageSections/downloadStyle';

// Sections for this component
import { downloadData } from './content';
// Component class
class DownloadSection extends React.Component {
  render() {
    const { title, description, stores } = downloadData;
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{title}</h2>
            <h4 className={classes.description}>
              {description}
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify='center'>
          {stores.map(store => (
            <Button
              key={store.id}
              href={store.to}
              target="_blank"
              className={classes.buttonImg}
            >
              <img className={classes.img} alt={store.id} src={store.img} />
            </Button>
          ))}
        </GridContainer>
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(downloadStyle)(DownloadSection);
