import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './car.css'
import { ADD_EXPENSE } from '../../api/api';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Expense(props) {

    const [nameExpense, setNameExpense] = useState('');
    const [description, setDesctiption] = useState('');
    const [count, setCount] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [carId, setCarId] = useState('');


    function addExpense(e) {
        e.preventDefault();
        const postData = {
            nameExpense,
            description,
            count,
            amount,
            categoryId,
            subCategoryId,
            carId,
        };
        console.log(postData);

        axios
            .post(
                ADD_EXPENSE,
                postData,
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            });
    };

    const data = (text) => {
        setCarId(props.carId);
        setNameExpense(text);
    }

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle className='header'>Добавление расхода </DialogTitle>
            <DialogContent >


                <TextField
                    margin="dense"
                    id="nameExpense"
                    label="Название расхода"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={nameExpense}
                    onChange={(e) => data(e.target.value)}
                />



                <TextField
                    margin="dense"
                    id="description"
                    label="Описание расхода"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                />



                <TextField
                    margin="dense"
                    id="count"
                    label="Количество"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                />



                <TextField
                    margin="dense"
                    id="amount"
                    label="Стоимость"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />


                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Категория"
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {props.categories.map((item) => (
                                <MenuItem value={item.id}>{item.nameCategory}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Подкатегория</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subCategoryId}
                            label="Подкатегория"
                            onChange={(e) => setSubCategoryId(e.target.value)}
                        >
                            {props.categories.map((item) => (
                                item.subCategories.map((i) => (
                                    <MenuItem value={i.id}>{i.nameSubCategory}</MenuItem>
                                ))
                            ))}
                        </Select>
                    </FormControl>
                </Box>


            </DialogContent>
            <DialogActions className='addcar'>
                <Button className='buttoncar' onClick={props.close} >Закрыть</Button>
                <Button className='buttoncar' onClick={addExpense} >Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}