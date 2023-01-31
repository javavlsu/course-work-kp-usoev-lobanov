import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function Settings() {
    const navigate = useNavigate();
    return(
        <Button variant="text" onClick={() => navigate('/')}>Выйти</Button>
    );
}