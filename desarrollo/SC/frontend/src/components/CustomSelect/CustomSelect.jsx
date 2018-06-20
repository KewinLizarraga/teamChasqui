import React from 'react';
import _ from 'lodash';

class CustomSelect extends React.Component {
  rendenSelectOptions = (options) => {
    const optionsArray = Object.keys(options);
    return _.map(optionsArray, option => (
      <option key={option} value={option}>
        {options[option]}
      </option>
    ));
  }
  render = () => {
    console.log(this.props);
    return (
      <div>
        <select {...this.props.input}>
          <option value=''>Elija</option>
          {this.rendenSelectOptions(this.props.options)}
        </select>
      </div>
    );
  }
}

export default CustomSelect;
