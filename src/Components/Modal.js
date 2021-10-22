import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export function Modal({item, open, setProps}) {
 
    let listaServicos = [];
    if (item){
      if (item.services){
        listaServicos = item.services;
      }
    } 
  
    return (
      <div >
        <BootstrapDialog   maxWidth="md"
        onClose={setProps} aria-labelledby="customized-dialog-title" open={open} >
          
          <BootstrapDialogTitle id="customized-dialog-title" onClose={setProps} >
            Detalhamento da Fatura {item.serviceOrderId}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            
          <TextField defaultValue={item.typePrice} size="small" sx={{  width: '98%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Cliente" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={item.plate} size="small"  sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Placa" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={item.situationName} size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Situação" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={moment(item.entryDateTime).format('DD/MM/YYYY hh:mm')} 
          size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Entrada" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={moment(item.exitDateTime).format('DD/MM/YYYY hh:mm')}
           sx={{  width: '48%', margin: 1, }} margin="dense" size="small"
          id="outlined-read-only-input" label="Saida" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={item.amount} size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Valor" 
          InputProps={{readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment>, }}/>
  
          <TextField defaultValue={item.amountServices} size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Valor Serviços" 
          InputProps={{readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment>, }}/>
  
          <TableContainer component={Paper}  sx={{  my: 3, mx: 0,   }}>
            <Table  size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Descrição Serviço</TableCell>
                  <TableCell align="right">Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listaServicos.map((row) => (
                  <TableRow key={row.serviceId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, }} >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold',  }}>
                      {row.description}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold',  }}>
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <TextField defaultValue={item.period&&item.period.minutes} size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Permanencia (em minutos)" InputProps={{readOnly: true, }}/>
  
          <TextField defaultValue={item.amountTotal} size="small" sx={{  width: '48%', margin: 1, }} margin="dense"
          id="outlined-read-only-input" label="Total" 
          InputProps={{readOnly: true, startAdornment: <InputAdornment position="start">R$</InputAdornment>, }}/>
  
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
}

  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            
        <Button variant="text" onClick={onClose}
        sx={{ position: 'absolute', right: 8,  top: 15, fontWeight: 'bold', }}>
            x
        </Button>
        ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};