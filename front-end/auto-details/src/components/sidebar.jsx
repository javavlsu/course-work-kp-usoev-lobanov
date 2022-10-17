import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './menu.css'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const nameAccount = localStorage.getItem('name').toString();

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (

    <div className='sidebar'>
      <div className='profile'>
        <Avatar {...stringAvatar(nameAccount)} className="avatar" />
        <Typography className='nameProfile'>{localStorage.getItem('name')}</Typography>
      </div>
      <div className='menu'>
        <Button className='button' variant="text" onClick={() => navigate('car')}>Автомобили</Button>
        <Button className='button' variant="text" onClick={() => navigate('table')}>Категории</Button>
        <Button className='button' variant="text" onClick={() => navigate('settings')} >Настройки</Button>
      </div>
    </div>);
}