import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import homeStyle from '../../assets/jss/material-kit-react/views/homeStyle';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
class Home extends React.Component {
  render = () => {
    const { classes } = this.props;
    return (
      <div style={{ margin: 20, marginTop: 70 }}>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem>
                <div className={classes.profile}>
                  <div className={classes.name}>
                    <h3 className={classes.title}>En mantenimiento. Por favor, espere a que todo se resuelva...</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(homeStyle)(Home);
