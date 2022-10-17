import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useCallback } from 'react';
import AddCar from './forms/addcar';
import { GET_CARS } from '../api/api';
import axios from 'axios';
import AlertDialog from './forms/dialog';

export default function Car() {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const close = () => { setOpen(false) };
    const closeDialog = () => { setOpenDialog(false) };

    const [cars, setCars] = useState([]);

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
        getCars(localStorage.getItem('id_user'))
    }, [])

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Добавить автомобиль</Button>
            <AddCar open={open} close={close} />
            <div style={{ display: "flex" }}>

                {cars.map((row) => (
                    <Card sx={{ maxWidth: 345, margin: "1%" }} key={row.id}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="300"
                            image="/images/car.jpg"
                            sx={{maxHeight: "100%", maxWidth: "100%", height: "auto"}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {row.brand}
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Характеристики</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">Марка</TableCell>
                                            <TableCell align="right">{row.brand}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">Модель</TableCell>
                                            <TableCell align="right">{row.model}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">Поколение</TableCell>
                                            <TableCell align="right">{row.generation}</TableCell>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">Пробег</TableCell>
                                            <TableCell align="right">{row.carParam.mileage}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color='error' onClick={() => setOpenDialog(true)}>Удалить</Button>
                            <AlertDialog open={openDialog} close={closeDialog} id={row.id} />
                            <Button size="small">Подробности</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
}