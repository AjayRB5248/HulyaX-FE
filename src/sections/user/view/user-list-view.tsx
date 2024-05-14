'use client';

import { useState } from 'react';
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
// _mock
import { _roles } from 'src/_mock';
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
import { IUserTableFilters } from 'src/types/user';
//
import { TableBody } from '@mui/material';
import { useUsers } from 'src/api/users';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email', width: 100 },
  { id: 'phoneNumber', label: 'Phone Number', width: 180 },
  { id: 'role', label: 'Role', width: 180 },
  { id: 'isApproved', label: 'Approved', width: 100 },
  { id: 'emailVerified', label: 'Email Verified', width: 100 },
  { id: 'phoneVerified', label: 'Phone Verified', width: 100 },
  { id: 'Action', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const table = useTable({
    defaultRowsPerPage: 10,
  });
  const { users, totalResults, loading } = useUsers({page:table?.page, limit:table?.rowsPerPage});

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

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

  const filteredUsers = users?.filter((user:any) => 
    (filters.role.length === 0 || filters.role.includes(user.role)) &&
    (user.name.toLowerCase().includes(filters.name) || user.email.toLowerCase().includes(filters.name))
  );
  

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
            <Tab iconPosition='end' value={'all'} label={'All'}></Tab>
            <Tab iconPosition='end' value={'customer'} label={'Customers'}></Tab>
            <Tab iconPosition='end' value={'companyAdmin'} label={'Business Users'}></Tab>
            <Tab iconPosition='end' value={'superAdmin'} label={'Super Admins'}></Tab>
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            roleOptions={_roles}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users?.totalResults}
                  numSelected={table.selected.length}
                />

                <TableBody>
                {filteredUsers?.map((row:any) => (
                    <UserTableRow key={row.id} row={row} />
                  ))}

                  <TableNoData notFound={users?.totalResults === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalResults} 
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={(event, newPage) => table.setPage(newPage)}
            onRowsPerPageChange={(event) => {
            const newRowsPerPage = parseInt(event.target.value, 10);
            table.setRowsPerPage(newRowsPerPage);
            table.setPage(0); 
            }}
          />
        </Card>
      </Container>
    </>
  );
}
