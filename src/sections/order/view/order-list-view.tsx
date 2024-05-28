'use client';

import { useEffect, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
// _mock
// utils
// hooks
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
// types
//
import { CircularProgress } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import OrderTableRow from '../order-table-row';

const TABLE_HEAD = [
  { id: '_id', label: 'Ticket #', width: 116 },
  { id: 'eventData.eventName', label: 'Event Name' },
  { id: 'bookedDate', label: 'Date', width: 140 },
  { id: 'eventData.artists', label: 'Artists', width: 140 },
  { id: 'eventData.venues', label: 'Venues', width: 140 },
  { id: 'eventData.status', label: 'Status', width: 110 },
  { id: '', width: 88 },
];

const myPurchasedTicket = (filter: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/tickets/show-purchased-ticket', {
        ...filter,
      })
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(new Error(`Unexpected status code: ${response.status}`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function OrderListView() {
  const table = useTable({
    defaultOrderBy: 'orderNumber',
    defaultRowsPerPage: 1,
  });
  const [data, setData] = useState({ ticket: [], count: 0 });
  const [filter, setFilter] = useState({
    limit: 5,
    page: 0,
    // createdAt:'',
    eventName: '',
    eventStatus: '',
  });

  const settings = useSettingsContext();

  const denseHeight = table.dense ? 52 : 72;
  const [loading, setLoading] = useState(false);

  const fetchTickets = (filter: any) => {
    setLoading(true);
    myPurchasedTicket(filter)
      .then((res: any) => {
        setData(res);
      })
      .catch((error) => {
        console.error('Failed to fetch tickets:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets(filter);
  }, []);

  useEffect(() => {
    if (data.ticket.length > 0) {
      fetchTickets(filter);
    }
  }, [filter.limit, filter.page, filter.eventStatus, filter.eventName]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Card>
          {loading ? (
            <div
              style={{
                display: 'grid',
                height: 200,
                width: '100%',
                placeItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <Table
                    size={table.dense ? 'small' : 'medium'}
                    sx={{ minWidth: 960 }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={data?.ticket.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                    />

                    <TableBody>
                      {data?.ticket?.map((row: any) => (
                        <OrderTableRow key={row._id} row={row} />
                      ))}

                      <TableNoData notFound={data?.count === 0} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={data?.count}
                page={filter?.page}
                rowsPerPage={filter?.limit}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={(event: any) =>
                  setFilter((prev) => ({
                    ...prev,
                    limit: parseInt(event.target.value, 10),
                  }))
                }
                //
                dense={table.dense}
                onChangeDense={table.onChangeDense}
                rowsPerPageOptions={[1, 5, 10]}
              />
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
