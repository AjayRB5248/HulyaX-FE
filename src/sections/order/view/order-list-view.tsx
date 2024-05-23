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
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
// types
//
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
    limit: 2,
    page: 0,
    // createdAt:'',
    eventName: '',
    eventStatus: '',
  });

  const settings = useSettingsContext();

  const denseHeight = table.dense ? 52 : 72;

  const fetchTickets = (filter: any) => {
    myPurchasedTicket(filter)
      .then((res: any) => {
        setData(res);
      })
      .catch((error) => {
        console.error('Failed to fetch tickets:', error);
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
        {/* <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 15,
          }}
        >
          {/* <select
            style={{
              width: 'fit-content',
              paddingInline: 15,
              color: 'black',
              marginBottom: 20,
              marginLeft: 20,
            }}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, eventStatus: e?.target?.value }))
            }
          >
            <option
              key={'select'}
              // selected={category === filter.eventStatus}
              style={{ height: 40 }}
              value={'select'}
              disabled
            >
              select
            </option>
            {['PENDING', 'CONFIRMED', 'CANCELLED'].map((category) => (
              <option
                key={category}
                selected={category === filter.eventStatus}
                style={{ height: 40 }}
                value={category}
              >
                {category}
              </option>
            ))}
          </select> */}

          <input
            type='text'
            style={{ width: 280, color: 'black' }}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                eventName: e?.target?.value,
              }))
            }
            value={filter?.eventName}
            placeholder='Event Name'
          />
        </div> */}
        <Card>
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

                  <TableEmptyRows height={denseHeight} emptyRows={2} />

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
        </Card>
      </Container>
    </>
  );
}
