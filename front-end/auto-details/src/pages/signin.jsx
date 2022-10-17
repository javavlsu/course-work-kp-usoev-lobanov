import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../api/api';
import axios from 'axios'; 

export default function SignIn() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
   
    const link = () => {
      navigate('/signup')
    }
    function auth (e) {
      e.preventDefault();
      const postData = {
          login,
          password,
      };
      console.log(postData);
      
       axios
           .post(
               LOGIN,
               postData,
           )
           .then((response) => {
               if (response.status === 200) {
                 console.log(response.data);
                 localStorage.setItem('name', response.data.fullName);
                 localStorage.setItem('token', response.data.token);
                 localStorage.setItem('id_user', response.data.id);
                 navigate('/home', {replace: true});
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
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='buttons'>
          <Button onClick={link} >Зарегистрироваться</Button>
          <Button onClick={auth} >Войти</Button>
          </div>
    </div>
    );
}