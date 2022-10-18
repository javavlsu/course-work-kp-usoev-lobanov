import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticDialog(props) {

    const data = {
        labels: props.cars.expenses,
        datasets: [
            {
                label: '# of Votes',
                data: props.cars.expenses,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Информация по расходам на автомобиль"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Диаграмма расходов. {props.carId}
                    </DialogContentText>
                    <Pie data={data} />
                    <DialogContentText id="alert-dialog-description">
                        Общая сумма расходов: {props.cars.totalCost}.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Количество расходов: {props.cars.count}.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Максимальная сумма расхода: {props.cars.maxAmount}.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Минимальная сумма расхода: {props.cars.minAmount}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
