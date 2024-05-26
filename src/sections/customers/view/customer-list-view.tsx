'use client';

import { useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Tabs from '@mui/material/Tabs';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
// types
import { ICustomerTableFilters } from 'src/types/user';
//
import { TableBody } from '@mui/material';
import UserTableRow from '../customer-table-row';
import UserTableToolbar from '../customer-table-toolbar';
import { useGetCustomerByEvent } from 'src/api/superAdmin';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 400},
  { id: 'email', label: 'Email', width: 400 },
  { id: 'phoneNumber', label: 'Phone Number', width: 400 },
];

const defaultFilters: ICustomerTableFilters = {
  name: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const table = useTable({
    defaultRowsPerPage: 15,
  });
  const { customers, loading } = useGetCustomerByEvent({page:table?.page, limit:table?.rowsPerPage});

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilters = (filterName:any, value:any) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value.trim().toLowerCase()
    }));
  };

  const handleFilterStatus = (event:any, newValue:any) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status: newValue,
      role: newValue === 'all' ? [] : [newValue],  
    }));
  };


  useEffect(() => {
    if (!customers) return;
    
    const filtered = customers?.filter((user:any) => 
      user?.customer?.name.toLowerCase().includes(filters?.name.toLowerCase()) || 
      user?.customer?.email.toLowerCase().includes(filters?.name.toLowerCase())
    );
  
    const uniqueUsers = filtered?.reduce((acc:any, current:any) => {
      const email = current?.customer?.email;
      if (!acc.some((user:any) => user?.customer?.email === email)) {
        acc.push(current);
      }
      return acc;
    }, []);
  
    setFilteredUsers(uniqueUsers);
  }, [customers, filters, table?.rowsPerPage]);
  
  
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='List'
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User', href: paths.dashboard.user.list },
            { name: 'List' }, 
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New User
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            <Tab iconPosition='end' value={'customer'} label={'Customers'}></Tab>
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={customers?.totalResults}
                  numSelected={table?.selected?.length}
                />

                <TableBody>
                {filteredUsers?.map((row:any) => (
                    <UserTableRow key={row.id} row={row} />
                  ))}

                  <TableNoData notFound={customers?.totalResults === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={customers?.length} 
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={(event, newPage) => {
              table.setPage(newPage + 1)
            }}
            onRowsPerPageChange={(event) => {
            const newRowsPerPage = parseInt(event.target.value, 10);
            table.setRowsPerPage(newRowsPerPage);
            table.setPage(1); 
            }}
          />
        </Card>
      </Container>
    </>
  );
}
