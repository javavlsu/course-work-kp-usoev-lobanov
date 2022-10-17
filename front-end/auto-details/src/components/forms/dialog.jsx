import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { DELETE_CAR } from '../../api/api';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    function deleteCar() {
        axios.get(DELETE_CAR, { params: { id: props.id } })
            .then((response) => {
                if (response.status === 200) setOpen(true);
                else setError(true);
            });
        props.close();
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
                        Автомобиль удален
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={errorClose} >
                    <Alert severity="error">Ошибка удаления автомобиля!</Alert>
                </Snackbar>
            </Stack>

            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Уверены, что хотите удалить автомобиль?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={props.close}>Закрыть</Button>
                    <Button onClick={deleteCar} autoFocus>
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
