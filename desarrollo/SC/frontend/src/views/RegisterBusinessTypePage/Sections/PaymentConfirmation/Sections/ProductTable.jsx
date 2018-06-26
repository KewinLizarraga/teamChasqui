import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

class ProductTable extends React.Component {
  render = () => {
    const { classes, product } = this.props;
    return (
      <div>
        <h3 className={classes.title}>Producto</h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.fontHeader + ' ' + classes.id}>ID</TableCell>
                <TableCell className={classes.fontHeader}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(product, (value, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell className={classes.fontBody} component='th' scope='row'>{key}</TableCell>
                    <TableCell component='th' scope='row'>{product[key]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default ProductTable;
