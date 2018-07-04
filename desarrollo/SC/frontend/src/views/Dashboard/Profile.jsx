import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import profileStyle from '../../assets/jss/material-kit-react/views/profileStyle';
import { getProfile } from '../../services/AuthService';

const TYPE = {
  admin: 'Administrador',
  tourist: 'Turista',
  businessman: 'Empresario'
}
const defaultImg = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png';

class Profile extends React.Component {
  render = () => {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const profile = getProfile();
    const { full_name, type, photo } = profile
    return (
      <div style={{ margin: 20, marginTop: 70 }}>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem>
                <div className={classes.profile}>
                  <div>
                    <img src={photo === '' ? defaultImg : photo} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{full_name}</h3>
                    <h6>{TYPE[type]}</h6>
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

export default withStyles(profileStyle)(Profile);
