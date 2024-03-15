
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Bug } from '../types/types';

interface Prop{
  bugs: Bug[]
}

export default function BasicTable({bugs}: Prop) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >User</TableCell>
            <TableCell >Project</TableCell>
            <TableCell >Date</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.map((bug: Bug) => (
            <TableRow
              key={bug.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" >
                {bug.id}
              </TableCell>
              <TableCell >{bug.description}</TableCell>
              <TableCell >{bug.username}</TableCell>
              <TableCell >{bug.project}</TableCell>
              <TableCell >{bug.creationDate.split('T')[0]}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}