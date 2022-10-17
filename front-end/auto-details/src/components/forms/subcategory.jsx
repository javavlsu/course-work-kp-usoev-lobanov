import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CREATE_SUBCATEGORY } from '../../api/api';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SubCategory(props) {
    const [nameCategory, setNameCategory] = useState('');
    const [nameSubCategory, setNameSubCategory] = useState('');

    function addSubCategory(e) {
        e.preventDefault();
        const postData = {
            nameCategory,
            nameSubCategory,
        };
        console.log(postData);

        axios
            .post(
                CREATE_SUBCATEGORY,
                postData,
            )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            });
        props.close();
    };

    const setValue = (name) => {
        setNameCategory(props.category);
        setNameSubCategory(name);
    }

    return (
        <Dialog open={props.dialog} onClose={props.close}>
            <DialogTitle>Добавление подкатегории</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Создание подкатегории в категории расходов "{props.category}"
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nameSubCategory"
                    label="Название подкатегории"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={nameSubCategory}
                    onChange={(e) => setValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Закрыть</Button>
                <Button onClick={addSubCategory}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );

}