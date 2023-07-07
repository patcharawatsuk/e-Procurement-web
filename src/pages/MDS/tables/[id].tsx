import React, { useState, useEffect } from 'react';
import * as XLSX from 'sheetjs-style';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from '../../../api/axios';
import DefaultLayout from '../../../layouts/DefaultLayout';

interface Column {
  columnName: string;
  excelColumnName: string;
}

interface TableDetail {
  tableName: string;
  columns: Column[];
}

export default function BasicTable() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [tableDetail, setTableDetail] = useState<TableDetail>({
    tableName: '',
    columns: [],
  });
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getColumn();
    }
  }, [id]);

  const getColumn = async () => {
    try {
      await axios
        .get<TableDetail>(`/mds/getTableConfig?id=${id}`)
        .then((res) => {
          setTableDetail(res.data);
          getData();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      await axios
        .get<TableDetail>(`/mds/getMainData?id=${id}`)
        .then((res: any) => {
          setData(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const xlsxData = data.map((row) => {
      const newRow: Record<string, any> = {};
      tableDetail.columns.forEach((column) => {
        newRow[column.excelColumnName] = row[column.columnName];
      });
      return newRow;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(xlsxData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const titleStyle = {
      fill: { fgColor: { rgb: "00005C" } },
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'center' }, // Center align the title
    };

    const contentStyle = {
      alignment: { horizontal: 'center' }, // Center align the content
      numFmt: "@" // Set the number format to text
    };
    
    // Get the range of the title row
    const range: XLSX.Range = XLSX.utils.decode_range(ws['!ref'] ?? '');
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
    ws[cellAddress].s = titleStyle;
    
    // Set column width (adjust the width value as needed)
    const columnWidth = 40; // Example width of 15 characters
    ws['!cols'] = ws['!cols'] || [];
    ws['!cols'][col] = { wch: columnWidth };

    // Apply center alignment to content cells in the column
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const contentCellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      ws[contentCellAddress].s = contentStyle;
    }
  }

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${tableDetail.tableName}.xlsx`);
  };

  return (
    <DefaultLayout>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableDetail.tableName}
        </Typography>
        <Link href={`/MDS/tables/import/${id}`}>
          <Tooltip title="Import">
            <IconButton>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Export">
          <IconButton onClick={() => exportToExcel()}>
            <CloudUploadIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableDetail.columns.map((column: Column) => (
                <TableCell key={column.columnName}>
                  {column.columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                {tableDetail.columns.map((column: Column) => (
                  <TableCell key={column.columnName}>
                    {row[column.columnName]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultLayout>
  );
}
