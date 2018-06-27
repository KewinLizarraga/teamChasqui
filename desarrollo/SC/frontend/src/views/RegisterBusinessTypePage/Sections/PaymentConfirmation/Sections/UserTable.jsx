import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getProfile } from '../../../../../services/AuthService';

class UserTable extends React.Component {
  render = () => {
    const { classes, user = [] } = this.props;
    return (
      <div>
        <h3 className={classes.title}>Dueño del negocio</h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.fontHeader + ' ' + classes.id}>ID</TableCell>
                <TableCell className={classes.fontHeader}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.fontBody} component='th' scope='row'>Nombre</TableCell>
                <TableCell component='th' scope='row'>{getProfile().full_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.fontBody} component='th' scope='row'>Rol</TableCell>
                <TableCell component='th' scope='row'>{user.role.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default UserTable;
