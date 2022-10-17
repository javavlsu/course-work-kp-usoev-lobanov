import * as React from 'react';
import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './style.css'
import { REGISTRATION } from '../api/api';

export default function SignUp() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function signup(e) {
        e.preventDefault();
        const postData = {
            login,
            fullName,
            email,
            password,
        };
        console.log(postData);

           axios
               .post(
                   REGISTRATION,
                   postData,
               )
               .then((response) => {
                   if (response.status === 200) {
                     console.log(response.data);
                     navigate('/');
                  } else {
                     alert('Error registration admin');
                   }

               });
    };

    return (
        <div className='page'>
            <h1>Car expenses</h1>
            <TextField
                margin="dense"
                id="login"
                label="Логин"
                type="text"
                fullWidth
                variant="standard"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />

            <TextField
                margin="dense"
                id="fullName"
                label="Полное имя"
                type="text"
                fullWidth
                variant="standard"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                margin="dense"
                id="password"
                label="Пароль"
                type="password"
                fullWidth
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className='buttons' onClick={signup} >Зарегистрироваться</Button>
        </div>
    );
}