import React from 'react';

// Thrid party library used by this component.

// Materias-ui components and functions used by this component.

// Components used by this component
import axios from 'axios';
// Styles for this component
import confirmEmailStyle from '../../assets/jss/material-kit-react/views/handleConfirmationStyle';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import image from '../../assets/img/login_bg.jpg';
import CardBody from '../../components/Card/CardBody';
import Button from '../../components/CustomButtons/Button';
// Sections for this component

// Component class
class ConfirmEmailPage extends React.Component {
  handleClick = () => {
    const { token } = this.props.match.params;
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/auth/confirmation',
      data: { token },
      validateStatus: (status) => {
        return status < 500
      }
    }).then(response => {
      console.log(response.data)
      if (response.statusText === 'OK') {
        this.props.history.replace('/login');
      }
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.pageHeader}
        style={{
          background: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={9} md={7} lg={6}>
              <Card >
                <CardHeader color='primary' className={classes.cardHeader}>
                  <h4 className={classes.title}>Verificar cuenta</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify='center'>
                    <GridItem className={classes.centerItem}>
                      <p>Precione el boton para confirmar y verificar su correo electronico.</p>
                    </GridItem>
                    <GridItem className={classes.centerItem}>
                      <Button onClick={this.handleClick} color="primary" size="lg">
                        Verificar
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(confirmEmailStyle)(ConfirmEmailPage);
