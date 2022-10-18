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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Category(props) {
    const id = localStorage.getItem('id_user').toString();
    const [nameCategory, setNameCategory] = useState('');
    const [carId, setCarId] = useState('');

    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

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
                    setOpen(true);
                }
                else setError(true);
            });
        props.close();
    };

    const data = (text) => {
        setCarId(props.carId);
        setNameCategory(text);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const errorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };

    return (
        <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: 'white !important' }}>
                        Категория расходов добавлена
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={errorClose} >
                    <Alert severity="error">Ошибка добавления категории расходов!</Alert>
                </Snackbar>
            </Stack>
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
        </div>
    );
}