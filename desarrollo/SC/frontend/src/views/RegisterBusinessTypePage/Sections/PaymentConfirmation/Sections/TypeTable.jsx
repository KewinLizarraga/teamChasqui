import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TypeTable extends React.Component {
  render = () => {
    const { classes, business } = this.props;
    const {
      type
    } = business;
    const specific = business[`${type}_detail`]
    const tableBodyContent = [];
    switch (type) {
      case 'hotel': {
        const { services, checkin_time, checkout_time, room_quantity } = specific;
        tableBodyContent.push(
          <TableRow key='0'>
            <TableCell className={classes.fontBody} component='th' scope='row'>Servicios</TableCell>
            <TableCell component='th' scope='row'>{services.map(service => service.name).toString()}</TableCell>
          </TableRow>
        );
        tableBodyContent.push(
          <TableRow key='1'>
            <TableCell className={classes.fontBody} component='th' scope='row'>CheckIn/Out</TableCell>
            <TableCell component='th' scope='row'>{
              `Checkin: ${checkin_time} ; Checkout: ${checkout_time}`
            }</TableCell>
          </TableRow>
        );
        tableBodyContent.push(
          <TableRow key='2'>
            <TableCell className={classes.fontBody} component='th' scope='row'># Cuartos</TableCell>
            <TableCell component='th' scope='row'>{`${room_quantity} cuartos`}</TableCell>
          </TableRow>
        )
        break;
      }
      case 'restaurant': {
        tableBodyContent.push(
          <TableRow key='0'>
            <TableCell className={classes.fontBody} component='th' scope='row'>Datos</TableCell>
            <TableCell component='th' scope='row'>{JSON.stringify(specific, null, 2)}</TableCell>
          </TableRow>
        );
        tableBodyContent.push(
          <TableRow key='1'>
            <TableCell className={classes.fontBody} component='th' scope='row'>Horario</TableCell>
            <TableCell component='th' scope='row'>{JSON.stringify(business.business_hours, null, 2)}</TableCell>
          </TableRow>
        );
        break;
      }
      default:
        break;
    }

    return (
      <div>
        <h3 className={classes.title}>Detalles del {type}</h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.fontHeader + ' ' + classes.id}>ID</TableCell>
                <TableCell className={classes.fontHeader}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {tableBodyContent}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}


export default TypeTable;
