import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import Row from './row';
import Category from '../forms/category';
import Expense from '../forms/expense';
import { GET_CARS, GET_CATEGORIES } from '../../api/api';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CollapsibleTable() {
  const close = () => { setOpen(false); };
  const [open, setOpen] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState('');

  const getCars = useCallback((key) => {
    axios
      .get(GET_CARS, { params: { id: key } })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCars(response.data);
        }
      })
  }, [cars])

  useEffect(() => {
    getCars(localStorage.getItem('id_user'));
    getCategories(localStorage.getItem('id_user').toString());
  }, [], [])

  const getCategories = useCallback((user, key) => {
    axios
      .get(
        GET_CATEGORIES, { params: { id: user, carId: key } },
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCategories(response.data);
        }
      });
  }, [categories])

  const closeExpense = () => { setOpenExpense(false); };

  const show = (key) => {
    setCarId(key);
    getCategories(localStorage.getItem('id_user').toString(), key)
  }
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Автомобиль</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carId}
            label="Автомобиль"
            sx={{ color: "black" }}
            onChange={(e) => show(e.target.value)}
          >
            {cars.map((item) => (
              <MenuItem value={item.id}>{item.brand}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button variant="text" onClick={() => setOpen(true)} sx={{ marginBottom: "3%" }}>Добавить категорию</Button>
      <Button onClick={() => setOpenExpense(true)} sx={{ marginBottom: "3%" }}>Добавить расход</Button>
      <Expense open={openExpense} close={closeExpense} carId={carId} categories={categories} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Название категории</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <Row key={row.id} row={row} carId={carId} />
            ))}
          </TableBody>
        </Table>
        <Category dialog={open} close={close} carId={carId} />

      </TableContainer>

    </div>
  );
}
