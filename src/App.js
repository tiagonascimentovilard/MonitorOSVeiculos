import * as React from 'react';
import {useState,useEffect} from 'react';
import {getListaPeriodo,getListaFiltros} from './Services/Api';
import {Modal} from './Components/Modal';

import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { tableCellClasses } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(key, placa, tabela, entrada) {
  return { key, placa, tabela, entrada };
}


function Content() {

  const [dataInicial, setDataInicial] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [dataFinal, setDataFinal] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [lista, setLista] = useState([]);
  const [listaResultado, setListaResultado] = useState([]);
  const [opcoesSituacao, setOpcoesSituacao] = useState([]);
  const [situacaoId, setSituacaoId] = useState(0);
  const [serviceOrder , setServiceOrder] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOrder = (order) => {
    const selecao = listaResultado.filter(item => item.serviceOrderId === order);
    console.log(JSON.stringify(selecao))
    setServiceOrder(selecao[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setServiceOrder({});
    setOpen(false);
  };

  const getFiltros = async () => {
    const filtros = await getListaFiltros();
    setOpcoesSituacao(filtros);
  };
  
  const getLista = async () => {
    const listaApi = await getListaPeriodo(dataInicial, dataFinal, situacaoId);
    setListaResultado(listaApi);
    setLista(listaApi.map((item) => createData( item.serviceOrderId, item.plate, item.typePrice, moment(item.entryDateTime).format('DD/MM/YYYY hh:mm') ) ) );
  };


  useEffect(() => {
    getLista();
    getFiltros();
  }, [dataInicial,dataFinal,situacaoId]); 

  return (
    <React.Fragment>
      <Modal open={open} setProps={handleClose} item={serviceOrder}/>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' }, }} />
      <CssBaseline />
      <AppBar maxWidth="md" position="static" color="default" elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, 
        justifyContent: 'center', width: '100%', alignItems: 'center'}} >
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between', width: 900,  }}>
          <Typography>
            <b>Visão Geral</b> {'> Transações'}
          </Typography>
          <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 'md' }}>
            <TextField onChange={(e) => setDataInicial(e.target.value)}  sx={{margin: 1,}}
              id="outlined-required"  defaultValue={dataInicial} size="small"  type="date" />
            <TextField onChange={(e) => setDataFinal(e.target.value)} 
              id="outlined-required"  defaultValue={dataFinal} size="small"  type="date" />
          </Toolbar>
        </Toolbar>
      </AppBar>

      <Container  disableGutters maxWidth="md" component="main" sx={{ pt: 2, pb: 2 }}>

        <Select labelId="demo-simple-select-autowidth-label"  id="demo-simple-select-autowidth" value={situacaoId}  size="small" 
          onChange={(e) => setSituacaoId(e.target.value)} >
          <MenuItem key={0} value={0}>
            Todos
          </MenuItem>
          {opcoesSituacao.map((item) => (
              <MenuItem key={item.situationId} value={item.situationId}>
                {item.situationName}
              </MenuItem>
            ))}
        </Select>

        <TableContainer component={Paper}>
          <Table  aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>Placa</StyledTableCell>
                <StyledTableCell align="center">Tabela</StyledTableCell>
                <StyledTableCell align="right">Entrada</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((row) => (
                <StyledTableRow key={row.key} onClick={() => handleClickOrder(row.key)}>
                  <StyledTableCell align="left">{row.placa}</StyledTableCell>
                  <StyledTableCell align="center">{row.tabela}</StyledTableCell>
                  <StyledTableCell align="right">{row.entrada}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </React.Fragment>
  );
}

export default function App() {
  return <Content />;
}
