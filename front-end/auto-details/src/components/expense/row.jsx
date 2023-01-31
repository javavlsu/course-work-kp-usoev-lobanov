import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import Expenses from './expenses';
import SubCategory from '../forms/subcategory';
import SubExpenses from './subexpenses';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_CATEGORY, DELETE_SUBCATEGORY } from '../../api/api';
import axios from 'axios';

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [on, setOn] = useState(false);
  const [nameCategory, setNameCategory] = useState('');
  const close = () => { setOn(false); };

  const clickOpen = (name) => {
    setOn(true);
    setNameCategory(name);
  }

  function deleteCategory(key) {
    axios.get(DELETE_CATEGORY, { params: { id: key } })
      .then();
  }

  function deleteSubCategory(key) {
    axios.get(DELETE_SUBCATEGORY, { params: { id: key } })
      .then();
  }

  return (
    <React.Fragment key={row.id}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.nameCategory}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="add" onClick={() => clickOpen(row.nameCategory)}>
            <AddIcon fontSize='small' />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={() => deleteCategory(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.subCategories.length > 0 &&
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Подкатегории
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Название подкатегории</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.subCategories.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography sx={{ width: '33%', flexShrink: 0, color: "black" }}>
                                {item.nameSubCategory}
                                <IconButton aria-label="delete" onClick={() => deleteSubCategory(item.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <SubExpenses exp={item.id} carId={props.carId} />
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                </Table>
              </Box>
            }
            <Expenses expenses={row.id} carId={props.carId} />
          </Collapse>
        </TableCell>
      </TableRow>
      <SubCategory dialog={on} close={close} category={nameCategory} />
    </React.Fragment>
  );
}