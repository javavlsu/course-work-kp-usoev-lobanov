import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CREATE_CATEGORY } from '../../api/api';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Category(props) {
    const id = localStorage.getItem('id_user').toString();
    const [nameCategory, setNameCategory] = useState('');
    const [carId, setCarId] = useState('');

    function addCategory(e) {
        e.preventDefault();
        const postData = {
            id,
            nameCategory,
            carId,
        };
        console.log(postData);

        axios
            .post(
                CREATE_CATEGORY,
                postData,
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            });
        props.close();
    };

    const data = (text) => {
        setCarId(props.carId);
        setNameCategory(text);
    }

    return (
        <Dialog open={props.dialog} onClose={props.close}>
            <DialogTitle>Создание категории </DialogTitle>
            <DialogContent>
                <DialogContentText> Создание категории расходов </DialogContentText>
                <TextField
                    margin="dense"
                    id="brand"
                    label="Название категории"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={nameCategory}
                    onChange={(e) => data(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Закрыть</Button>
                <Button onClick={addCategory}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}