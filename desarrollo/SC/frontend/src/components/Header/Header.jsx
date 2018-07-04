import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';

// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Drawer from '@material-ui/core/Drawer';

// Styles for this component
import headerStyle from '../../assets/jss/material-kit-react/components/headerStyle';

// Component class
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount = () => {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }
  headerColorChange = () => {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(changeColorOnScroll.color);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(changeColorOnScroll.color);
    }
  }

  render() {
    const {
      classes,
      color,
      absolute,
      fixed,
      brand='Tinkuy',
      leftLinks,
      rightLinks
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });
    const brandComponent = (
      <Button href='/' className={classes.title}>
        <h4 className={classes.textTitle}>{brand}</h4>
      </Button>
    )
    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}> 
          {leftLinks !== undefined ? brandComponent : null }
          <div className={classes.flex} >
            {leftLinks !== undefined ? (
              <Hidden smDown implementation='css'>
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
          </div>
          <Hidden smDown implementation='css'>
            {rightLinks}
          </Hidden>
          <Hidden mdUp>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={this.handleDrawerToggle}
              >
                <Icon>menu</Icon>
              </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor='right'
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.appResponsive}>
                {leftLinks}
                {rightLinks}
              </div>
            </Drawer>
        </Hidden>
      </AppBar>
    )
  }
}

Header.defaultProp = {
  color: 'white'
}

// ProtTypes for this component

// Export component
export default withStyles(headerStyle)(Header);
