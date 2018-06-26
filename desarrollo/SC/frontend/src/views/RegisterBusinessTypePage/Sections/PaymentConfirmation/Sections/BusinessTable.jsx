import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class BusinessTable extends React.Component {
  render = () => {
    const { classes, business } = this.props;
    const {
      name,
      country,
      department,
      province,
      district,
      address,
      city_code,
      web_page,
      face_page,
      money_types,
      phone,
      price,
    } = business;
    return (
      <div>
        <h3 className={classes.title}>Detalles del negocio</h3>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.fontHeader + ' ' + classes.id}>ID</TableCell>
                <TableCell className={classes.fontHeader}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Nombre</TableCell>
                <TableCell component='th' scope='row'>{name}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Localización</TableCell>
                <TableCell component='th' scope='row'>{
                  country.name + ' - ' +
                  department.name + ' - ' +
                  province.name + ' - ' +
                  district.name
                }</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Dirección</TableCell>
                <TableCell component='th' scope='row'>{`${address.details} - ${address.reference}`}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Código postal</TableCell>
                <TableCell component='th' scope='row'>{city_code}</TableCell>
              </TableRow>
              {web_page && (
                <TableRow >
                  <TableCell className={classes.fontBody} component='th' scope='row'>Página web</TableCell>
                  <TableCell component='th' scope='row'>{web_page}</TableCell>
                </TableRow>
              )}
              {face_page && (
                <TableRow >
                  <TableCell className={classes.fontBody} component='th' scope='row'>Página de Facebook</TableCell>
                  <TableCell component='th' scope='row'>{face_page}</TableCell>
                </TableRow>
              )}
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Tipos de monedas</TableCell>
                <TableCell component='th' scope='row'>{money_types.map(type => type.name).toString()}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Celular</TableCell>
                <TableCell component='th' scope='row'>{phone}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className={classes.fontBody} component='th' scope='row'>Precios</TableCell>
                <TableCell component='th' scope='row'>{
                  `min: $${price.min.toFixed(2)} ; max: $${price.max.toFixed(2)} ; prom: $${price.average.toFixed(2)}`
                }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}


export default BusinessTable;
