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
//
import { TableBody } from '@mui/material';
import VenueTableRow from '../venue-table-row';
import VenueTableToolbar from '../venue-table-toolbar';
import { useVenues } from 'src/api/venues';
import { IVenueTableFilters } from 'src/types/venue';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'venueName', label: 'Venue Name', width: 250 },
  { id: 'state', label: 'State',width: 250  },
  { id: 'Action', width: 88 },
];

const defaultFilters: IVenueTableFilters = {
  venueName: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function VenueListView() {
  const table = useTable({
    defaultRowsPerPage: 10,
  });
  const { venues } = useVenues();


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

  const filteredVenues = venues?.venues?.filter((venue:any) => 
    venue?.venueName?.toLowerCase().includes(filters?.venueName)
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='List'
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Venue', href: paths.dashboard.venue.list },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.venue.new}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Venue
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

          <VenueTableToolbar
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
                  rowCount={venues?.count}
                  numSelected={table.selected.length}
                />
                <TableBody>
                  {filteredVenues?.map((row: any) => (
                    <VenueTableRow key={row?._id} row={row} />
                  ))}

                  <TableNoData notFound={venues?.count === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={venues?.count}
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
