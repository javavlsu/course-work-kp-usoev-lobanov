import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { GET_SUB_EXPENSES } from '../../api/api';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SubExpenses(props) {
  const [expenses, setExpenses] = useState([]);

  const getExpenses = useCallback((key, car) => {
    axios
      .get(GET_SUB_EXPENSES, { params: { idCategory: key, idSubCategory: key, carId: car } })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setExpenses(response.data);
        }
      })
  }, [expenses])

  useEffect(() => {
    getExpenses(props.exp, props.carId)
  }, [])

  return (
    <div>
      {expenses.length > 0 &&
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div" sx={{ color: "black" }}>
            Расходы
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Название расхода</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Количество</TableCell>
                <TableCell>Стоимость</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">{item.nameExpense}</TableCell>
                  <TableCell component="th" scope="row">{item.description}</TableCell>
                  <TableCell component="th" scope="row">{item.count}</TableCell>
                  <TableCell component="th" scope="row">{item.amount}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      }
    </div>
  );
}