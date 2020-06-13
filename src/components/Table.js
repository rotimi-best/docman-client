import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import formatDate from '../helpers/formatDate';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 550,
    minHeight: 550,
    margin: '30px !important'
  }
});

export default function SimpleTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <a
                  href={row.url}
                  target="_blank"
                >
                  {row.name}
                </a>
              </TableCell>
              <TableCell align="right">{!row.total ? row.type : '--------'}</TableCell>
              <TableCell align="right">{!row.total ? '$'+row.cost : '--------'}</TableCell>
              <TableCell align="right">
                {!row.total ? formatDate(new Date(row.createdAt)) : '$'+row.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
