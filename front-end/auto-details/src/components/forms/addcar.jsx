import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './car.css'
import { ADD_CAR } from '../../api/api';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export default function AddCar(props) {
    const [idUser] = localStorage.getItem('id_user');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [generation, setGeneration] = useState('');
    const [yearOfIssue, setYearOfIssue] = useState('');
    const [winCode, setWinCode] = useState('');
    const [color, setColor] = useState('');
    const [body, setBody] = useState('');
    const [typeEngine, setTypeEngine] = useState('');
    const [engineCpacity, setEngineCapacity] = useState('');
    const [power, setPower] = useState('');
    const [milleage, setMilleage] = useState('');
    const [kpp, setKpp] = useState('');
    const [driveUnit, setDriveUnit] = useState('');
    const [steeringWheelPosition, setSteeringWheelPosition] = useState('');
    const [cunsumption, setCunsumption] = useState('');
    const [ptsSeries, setPtsSeries] = useState('');
    const [ptsNumber, setPtsNumber] = useState('');
    const [stsSeries, setStsSeries] = useState('');
    const [stsNumber, setStsNumber] = useState('');

    function addcar(e) {
        e.preventDefault();
        const postData = {
            idUser,
            brand,
            model,
            generation,
            yearOfIssue,
            winCode,
            color,
            body,
            typeEngine,
            engineCpacity,
            power,
            milleage,
            kpp,
            driveUnit,
            steeringWheelPosition,
            cunsumption,
            ptsSeries,
            ptsNumber,
            stsSeries,
            stsNumber,
        };
        console.log(postData);

        axios
            .post(
                ADD_CAR,
                postData,
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                } else {
                    alert('Error registration admin');
                }

            });
        props.close();
    };

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle className='header'>Добавление автомобиля</DialogTitle>
            <DialogContent className='car'>
                <td className='row'>
                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="brand"
                            label="Марка"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="model"
                            label="Модель"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="generation"
                            label="Поколение"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={generation}
                            onChange={(e) => setGeneration(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="yearOfIssue"
                            label="Год выпуска"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={yearOfIssue}
                            onChange={(e) => setYearOfIssue(e.target.value)}
                        />
                    </tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="winCode"
                            label="WIN"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={winCode}
                            onChange={(e) => setWinCode(e.target.value)}
                        /></tr>
                </td>
                <td className='row'>
                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="color"
                            label="Цвет"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="body"
                            label="Кузов"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="typeEngine"
                            label="Тип двигателя"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={typeEngine}
                            onChange={(e) => setTypeEngine(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="engineCapacity"
                            label="Объем двигателя"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={engineCpacity}
                            onChange={(e) => setEngineCapacity(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="power"
                            label="Мощность"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={power}
                            onChange={(e) => setPower(e.target.value)}
                        /></tr>
                </td>
                <td className='row'>
                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="milleage"
                            label="Пробег"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={milleage}
                            onChange={(e) => setMilleage(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <Box sx={{ minWidth: 120 }} className='cell-item'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">КПП</InputLabel>
                                <Select sx={{ minWidth: 120, }}
                                    labelId="kpp"
                                    id="kpp"
                                    value={kpp}
                                    label="КПП"
                                    onChange={(e) => setKpp(e.target.value)}
                                >
                                    <MenuItem value={"Механическая"}>Механическая</MenuItem>
                                    <MenuItem value={"Автоматическая"}>Автоматическая</MenuItem>
                                    <MenuItem value={"Робот"}>Робот</MenuItem>
                                    <MenuItem value={"Вариатор"}>Вариатор</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </tr>

                    <tr className='cell'>
                        <Box sx={{ minWidth: 120 }} className='cell-item'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Привод</InputLabel>
                                <Select sx={{ minWidth: 120, }}
                                    labelId="driveUnit"
                                    id="driveUnit"
                                    value={driveUnit}
                                    label="Привод"
                                    onChange={(e) => setDriveUnit(e.target.value)}
                                >
                                    <MenuItem value={"Передний"}>Передний</MenuItem>
                                    <MenuItem value={"Задний"}>Задний</MenuItem>
                                    <MenuItem value={"Полный"}>Полный</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </tr>

                    <tr className='cell'>
                        <Box sx={{ minWidth: 120 }} className='cell-item'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Положение руля</InputLabel>
                                <Select sx={{ minWidth: 120, }}
                                    labelId="steeringWheelPosition"
                                    id="steeringWheelPosition"
                                    value={steeringWheelPosition}
                                    label="Положение руля"
                                    onChange={(e) => setSteeringWheelPosition(e.target.value)}
                                >
                                    <MenuItem value={"Правый"}>Правый</MenuItem>
                                    <MenuItem value={"Левый"}>Левый</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="consumption"
                            label="Расход"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={cunsumption}
                            onChange={(e) => setCunsumption(e.target.value)}
                        /></tr>
                </td>
                <td className='row'>
                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="ptsSeries"
                            label="Серия ПТС"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={ptsSeries}
                            onChange={(e) => setPtsSeries(e.target.value)}
                        /></tr>
                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="ptsNumber"
                            label="Номер ПТС"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={ptsNumber}
                            onChange={(e) => setPtsNumber(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="stsSeries"
                            label="Серия СТС"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={stsSeries}
                            onChange={(e) => setStsSeries(e.target.value)}
                        /></tr>

                    <tr className='cell'>
                        <TextField className='cell-item'
                            margin="dense"
                            id="stsNumber"
                            label="Серия СТС"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={stsNumber}
                            onChange={(e) => setStsNumber(e.target.value)}
                        /></tr>
                </td>
            </DialogContent>
            <DialogActions className='addcar'>
                <Button className='buttoncar' onClick={() => props.close()}>Закрыть</Button>
                <Button className='buttoncar' onClick={addcar} >Добавить</Button>
            </DialogActions>
        </Dialog>
    );
}