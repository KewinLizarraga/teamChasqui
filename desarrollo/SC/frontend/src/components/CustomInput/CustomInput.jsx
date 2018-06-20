import React from 'react';

// Thrid party library used by this component.
import classNames from 'classnames';
// Materias-ui components and functions used by this component.
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
// Components used by this component

// Styles for this component
import customInputStyle from '../../assets/jss/material-kit-react/components/customInputStyle';
// Sections for this component

// Component class
const CustomInput = ({ ...props }) => {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    white,
    inputRootCustomClasses,
    input,
    meta,
    ...rest
  } = props;
  const error = !!meta.error && meta.touched;
  const success = !meta.error && meta.touched;
  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  const formControlClasses = classNames({
    [classes.formControl]: true,
    [classes.formControlLabel]: labelText !== undefined,
    [formControlProps.className]: formControlProps.className !== undefined
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlClasses}
      {...rest}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + ' ' + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...input}
        {...inputProps}
      />
      {error ? (
        <Icon className={classes.feedback + ' ' + classes.labelRootError}>clear</Icon>
      ) : success ? (
        <Icon className={classes.feedback + ' ' + classes.labelRootSuccess}>check</Icon>
      ) : null}
    </FormControl>
  );
}

// ProtTypes for this component
CustomInput.defaultProps = {
  formControlProps: {}
}
// Export component
export default withStyles(customInputStyle)(CustomInput);
