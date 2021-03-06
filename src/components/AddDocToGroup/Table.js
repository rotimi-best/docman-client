import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import formatDate from '../../helpers/formatDate';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 550,
    margin: '30px !important'
  },
});

export default function SimpleTable({ data, handleDoc, selectedDocs }) {
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
            <TableCell align="right">+</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">
                {formatDate(new Date(row.createdAt))}
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="add" size="medium" onClick={() => handleDoc(row._id)}>
                  {selectedDocs.includes(row._id)
                    ? <RemoveCircleIcon color="primary" />
                    : <AddCircleIcon color="primary" />
                  }
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
