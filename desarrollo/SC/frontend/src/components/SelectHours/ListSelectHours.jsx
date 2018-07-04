import React from 'react';
import _ from 'lodash';
import SelectHours from './SelectHours';
import { Button } from '@material-ui/core';
class ListSelectHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false
    }
  }
  handleClose = (idx) => {
    const { actions } = this.props;
    actions.deleteHour(idx);
    this.setState({
      buttonDisabled: false
    });
  }
  handleTimeChange = (idx, type, value) => {
    const { actions } = this.props;
    actions.changeTime(idx, type, value);
  }
  handleDaysChange = (idx, ev) => {
    const { actions } = this.props;
    const { value } = ev.target;
    const { buttonDisabled } = this.state;
    actions.changeDays(idx, value)
    if (!_.isEmpty(value) && buttonDisabled === true) {
      this.setState({
        buttonDisabled: false
      });
    } else if (_.isEmpty(value)) {
      this.setState({
        buttonDisabled: true
      });
    }
  }
  handleButtonClick = () => {
    const { actions } = this.props;
    actions.addHour();
    this.setState({
      buttonDisabled: true
    });
  }
  renderSelectHours = (hours) => {
    return _.map(hours, (hour, idx) => {
      return (
        <SelectHours
          key={idx}
          multiSelectProps={{
            id: idx,
            disabled: hours.length !== idx + 1,
            value: hour.days,
            handleChange: this.handleDaysChange.bind(null, idx),
            options: hour.options
          }}
          startTimeProps={{
            defaultValue: hour.start,
          }}
          endTimeProps={{
            defaultValue: hour.end
          }}
          handleClose={this.handleClose.bind(null, idx)}
          handleTimeChange={this.handleTimeChange.bind(null, idx)}
        />
      );
    });
  }
  render = () => {
    return (
      <div>
        {this.renderSelectHours(this.props.hours)}
        <Button
          style={{
            float: 'right'
          }}
          variant='fab'
          color='primary'
          onClick={this.handleButtonClick}
          disabled={this.state.buttonDisabled || this.props.selected.length === 7}
        >+</Button>
      </div>
    )
  }
}

export default ListSelectHours;
