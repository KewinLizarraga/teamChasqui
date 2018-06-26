import React from 'react';
import { Select, Input, MenuItem, InputLabel, FormControl, Chip } from '@material-ui/core';


class CustomMultiSelect extends React.Component {
  render = () => {
    const { id, label, value, handleChange, options, disabled } = this.props;
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={`select-multiple-${id}`}>{label}</InputLabel>
        <Select
          disabled={disabled}
          multiple
          value={value}
          onChange={handleChange}
          input={<Input id={`select-multiple-${id}`} />}
          renderValue={selected => (
            <div >
              {selected.map(value => <Chip key={value} label={options[value]} />)}
            </div>
          )}

        >
          {Object.keys(options).map(value => (
            <MenuItem key={value} value={value} >{options[value]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default CustomMultiSelect;
