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
import ArtistTableRow from '../artist-table-row';
import ArtistTableToolbar from '../artist-table-toolbar';
import { useArtists } from 'src/api/artists';
import { IArtistTableFilters } from 'src/types/artist';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'profile', label: 'Profile Picture', width: 200 },
  { id: 'artistName', label: 'Artist Name' },
  { id: 'category', label: 'Category', width: 200 },
  { id: 'Action', width: 88 },
];

const defaultFilters: IArtistTableFilters = {
  artistName: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  const table = useTable({
    defaultRowsPerPage: 10,
  });
  const { artists } = useArtists();


  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = (filterName:any, value:any) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value.trim().toLowerCase()
    }));
  };
  const handleFilterStatus = () => {};

  const filteredUsers = artists?.artists?.filter((artist:any) => 
    artist?.artistName?.toLowerCase().includes(filters?.artistName)
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='List'
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Artist', href: paths.dashboard.artist.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.artist.new}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Artist
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
          </Tabs>

          <ArtistTableToolbar
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
                  rowCount={artists?.length}
                  numSelected={table.selected.length}
                />

                <TableBody>
                  {filteredUsers?.map((row: any) => (
                    <ArtistTableRow key={row.id} row={row} />
                  ))}

                  <TableNoData notFound={artists?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={artists?.artists?.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
