import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Datetime from 'react-datetime';

const CustomDatetime = ({
  label,
  placeholder,
  input,
  formControlProps,
  dateTimeProps,
  type,
  ...props
}) => {
  return (
    <div>
      <InputLabel style={{fontSize: '11px'}} >
        {label}
      </InputLabel>
      <br />
      <FormControl
        style={{
          color: 'black'
        }}
        {...formControlProps}
      >
        <Datetime
          {...dateTimeProps}
          inputProps={{
            placeholder,
            type,
          }}
          {...input}
        />
      </FormControl>
    </div>
  )
}

export default CustomDatetime;
