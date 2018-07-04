import React from 'react';
import CustomMultiSelect from '../CustomMultiSelect/CustomMultiSelect';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import CustomDatetime from '../CustomDatetime/CustomDatetime';

const SelectHours = ({
  multiSelectProps,
  startTimeProps,
  endTimeProps,
  handleTimeChange,
  handleClose,
  ...props
}) => {
  const onChange = (type, mHour) => {
    const hour = mHour.format('LT');
    handleTimeChange(type, hour);
  }
  return (
    <GridContainer
      justify='center'
      style={{
        marginBottom: '20px',
        border: '1px solid #949494',
        borderRadius: '5px',
        paddingBottom: '5px'
      }}
    >
      {multiSelectProps.disabled === false ?
        (<GridItem>
          <p
            onClick={handleClose}
            style={{
              margin: 0,
              padding: 0,
              height: '0px',
              marginTop: '5px',
              fontSize: '15px',
              textAlign: 'right'
            }}
          >X</p>
        </GridItem>) : null
      }
      <GridItem xs={12} sm={9} md={9}>
        <CustomMultiSelect
          label='Dias de la semana'
          {...multiSelectProps}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <CustomDatetime
          label='Hora de ingreso'
          placeholder='Elija una hora'
          formControlProps={{
            fullWidth: true
          }}
          dateTimeProps={{
            ...startTimeProps,
            dateFormat: false,
            timeConstraints: {
              minutes: { step: 15 }
            }
          }}
          input={{
            onChange: onChange.bind(null, 'start')
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={4} md={4}>
        <CustomDatetime
          label='Hora de salida'
          placeholder='Elija una hora'
          formControlProps={{
            fullWidth: true
          }}
          dateTimeProps={{
            ...endTimeProps,
            dateFormat: false,
            timeConstraints: {
              minutes: { step: 15 }
            }
          }}
          input={{
            onChange: onChange.bind(null, 'end')
          }}
        />
      </GridItem>
    </GridContainer>
  );
}

export default SelectHours;
