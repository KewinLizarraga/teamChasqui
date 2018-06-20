import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
// Components used by this component

// Styles for this component
import parallaxStyle from '../../assets/jss/material-kit-react/components/parallaxStyle.jsx';
// Sections for this component

// Component class
class Parallax extends React.Component {
  constructor(props) {
   super(props)
   const windowScrollTop = window.pageYOffset / 3;
   this.state = {
     transform: `translate5d(0,${windowScrollTop}px,0)`
   };
  }
  componentDidMount = () => {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`
    });
    window.addEventListener('scroll', this.resetTransform);
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.resetTransform);
  }
  resetTransform = () => {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`
    });
  }
  render() {
    const {
      classes,
      filter,
      className,
      children,
      style,
      image,
      small
    } = this.props;
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    });
    return (
      <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: `url(${image})`,
          ...this.state
        }}
      >
        {children}
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(parallaxStyle)(Parallax);
