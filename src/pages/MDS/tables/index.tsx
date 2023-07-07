import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Link from 'next/link';
import { Button } from '@mui/material';

import axios from '../../../api/axios';

import DefaultLayout from '../../../layouts/DefaultLayout';

interface TableData {
  id: number;
  tableName: string;
}

export default function BasicTable(): JSX.Element {
  const [data, setData] = useState<TableData[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await axios.get<TableData[]>('/mds/getAllTables').then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <DefaultLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Table name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.tableName}
                </TableCell>
                <TableCell align="right">
                  <Link href={`/MDS/tables/${row.id}`}>
                    <Button variant="outlined" size="small" color="success">
                      Select
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        /> */}
      </TableContainer>
    </DefaultLayout>
  );
}
