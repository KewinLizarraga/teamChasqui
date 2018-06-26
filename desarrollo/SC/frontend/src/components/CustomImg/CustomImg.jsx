import React from 'react';
import classNames from 'classnames'
import image from '../../assets/img/preview.jpg'
import { withStyles } from '@material-ui/core/styles';
import customImgStyle from '../../assets/jss/material-kit-react/components/customImgStyle';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { setCurrentImage } from '../../actions/businessActions'

class CustomImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: image
    }
  }
  handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          currentImg: e.target.result
        });
      }
      this.props.setCurrentImage(event.target.files[0])
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  render = () => {
    const { classes } = this.props;
    const imgClass = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    return (
      <div className={classes.container}>
        <h4 className={classes.imgTitle}>Imagen del negocio</h4>
        <input
          className={classes.input}
          id='raised-button-file'
          type='file'
          onChange={this.handleChange}
        />
        <img
          src={this.state.currentImg}
          alt="..."
          className={imgClass}
        />
        <label htmlFor='raised-button-file'>
          <Button variant='contained' component='span' color='primary' >
            Elegir imagen
          </Button>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentImage: file => {
    dispatch(setCurrentImage(file));
  }
})

export default connect(() => ({}), mapDispatchToProps)(withStyles(customImgStyle)(CustomImg));
