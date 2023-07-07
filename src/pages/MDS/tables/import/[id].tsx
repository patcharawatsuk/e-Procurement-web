import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  Chip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import axios from '../../../../api/axios';

import { setLoading } from '../../../../store/loadingSlice';

import DefaultLayout from '../../../../layouts/DefaultLayout';

interface Column {
  columnName: string;
  excelColumnName: string;
}

interface TableDetail {
  tableName: string;
  columns: Column[];
}

interface RowData {
  [columnName: string]: string | number;
}

export default function BasicTable() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);
  const [tableDetail, setTableDetail] = useState<TableDetail>({
    tableName: '',
    columns: [],
  });
  const { id } = router.query;

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      getColumn();
    }
  }, [id]);

  const getColumn = async () => {
    console.log(id);

    try {
      const response = await axios.get<TableDetail>(
        `/mds/getTableConfig?id=${id}`,
      );
      console.log(response.data.columns);
      await setTableDetail(response.data);
      await getTemolateData();
    } catch (error) {
      console.error(error);
    }
  };

  const getTemolateData = async () => {
    try {
      await axios.get(`/mds/getTempData?id=${id}`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setTempTable = async (data: RowData[]) => {
    try {
      await axios
        .post(`/mds/setTempTable?id=${id}`, JSON.stringify(data))
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the value of the file input
      // fileInputRef.current.click(); // Trigger a click event on the file input
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (extension !== 'xlsx') {
        enqueueSnackbar('Invalid file format. Please select a .xlsx file.', {
          variant: 'error',
        });
        return;
      }
      dispatch(setLoading(true));
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        const bstr = evt.target?.result as string;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];

        // Convert worksheet to JSON using custom converter function
        let json_data = XLSX.utils.sheet_to_json(ws, {
          blankrows: true,
          defval: '',
        });
        // Filter empty row
        json_data = json_data.filter((obj: any) => {
          return !Object.values(obj).every((value) => value == '');
        });
        // Delete __EMPTY key
        json_data.forEach((obj: any) => {
          if (obj.hasOwnProperty('__EMPTY')) {
            delete obj.__EMPTY;
          }
        });

        if (!validXlxsTemplate(json_data, tableDetail.columns)) {
          enqueueSnackbar('Invalid Template', {
            variant: 'error',
          });
        } else {
          const rows: any[] = json_data.map((itemXlxs: any) => {
            let newData: any = {};
            tableDetail.columns.forEach((column) => {
              newData[column.columnName] = itemXlxs[column.excelColumnName] !== undefined
                ? itemXlxs[column.excelColumnName].toString()
                : '';
            });
            return newData;
          });
          // setData(rows);
          setTempTable(rows);
        }
      };
      reader.readAsBinaryString(file);
      dispatch(setLoading(false));
    }
  };

  function validXlxsTemplate(data: any[], columns: Column[]): boolean {
    for (const column of columns) {
      for (const row of data) {
        if (row[column.excelColumnName] == undefined) {
          return false;
        }
      }
    }
    for (const row of data) {
      for (const key in row) {
        if (!columns.find((column: Column) => column.excelColumnName === key)) {
          return false;
        }
      }
    }
    return true;
  }

  const onClickSubmit = async (): Promise<void> => {
    // dispatch(setLoading(true));
    try {
      await axios
        .get<TableDetail>(`/mds/syncTempToMainTable?id=${id}`)
        .then((res) => {
          enqueueSnackbar('Success', {
            variant: 'success',
          });
          router.push(`/MDS/tables/${id}`);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDownloadTemplate = async (): Promise<void> => {
    try {
      const response = await axios.get(`/mds/downloadTemplate?id=${id}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const filename = tableDetail
        ? tableDetail.tableName + '.xlsx'
        : 'default-filename.xlsx';

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  function renderStatus(isSuccess: number | undefined, errors?: string[]) {
    if (isSuccess !== 0 && isSuccess !== 1) {
      return '-';
    } else if (isSuccess == 1) {
      return <Chip label="ข้อมูลถูกต้อง" color="success" />;
    } else if (isSuccess == 0) {
      return (
        <>
          {errors &&
            errors.map((error) => (
              <Chip
                key={error}
                label={error}
                color="error"
                style={{ margin: 2 }}
              />
            ))}
        </>
      );
    }
  }

  return (
    <DefaultLayout>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Upload file
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Download template">
            <IconButton onClick={() => onClickDownloadTemplate()}>
              <TextSnippetIcon />
            </IconButton>
          </Tooltip>
          <FormControl sx={{ ml: 2 }}>
            <label htmlFor="file-input">
              <Button
                component="span"
                variant="contained"
                onClick={handleButtonClick}
              >
                Upload
              </Button>
            </label>
            <input
              id="file-input"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </FormControl>
        </Box>
      </Toolbar>
      {data.length > 0 && (
        <>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Preview Data
            </Typography>
            <Tooltip title="Execute">
              <IconButton onClick={() => onClickSubmit()}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {tableDetail.columns.map((column) => (
                    <TableCell key={column.columnName}>
                      {column.columnName}
                    </TableCell>
                  ))}
                  <TableCell key={'status'}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <TableRow key={index}>
                    {tableDetail.columns.map((column) => (
                      <TableCell key={column.columnName}>
                        {data[column.columnName]}
                      </TableCell>
                    ))}
                    <TableCell key={'status'}>
                      {/* {data['isSuccess'] ? 'Success' : '-'} */}
                      {renderStatus(data['isSuccess'], data['errors'])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </DefaultLayout>
  );
}
