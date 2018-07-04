// TODO: mostrar mensaje en caso de algun error o en caso de exito snackbark
// TODO: implementar usando dispatch
import React from 'react';
import { tinkuyAxios } from '../../services/axios';
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
import HeaderLinks from '../../components/Header/HeaderLinks';
import Header from '../../components/Header/Header';

class ConfirmEmailPage extends React.Component {
  handleClick = () => {
    const { token } = this.props.match.params;
    tinkuyAxios({
      method: 'post',
      url: '/auth/confirmation',
      data: { token }
    }).then(response => {
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
        <Header
          color="transparent"
          brand={process.env.REACT_APP_BRAND || 'Tinkuy'}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: 'white'
          }}
        />
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
