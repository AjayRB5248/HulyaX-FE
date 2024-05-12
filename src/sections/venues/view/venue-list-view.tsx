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
import VenueTableRow from '../venue-table-row';
import VenueTableToolbar from '../venue-table-toolbar';
import { useArtists } from 'src/api/artists';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'profile', label: 'Profile Picture', width: 250 },
  { id: 'name', label: 'Name' },
  { id: 'genre', label: 'Genre', width: 200 },
  { id: 'Action', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function VenueListView() {
  const table = useTable({
    defaultRowsPerPage: 10,
  });
  // const { artists } = useArtists();
  const artists = [
    {
        name: "Sacar Adhikari",
        avatarSrc: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/428606958_979593436857040_9093732891230991285_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=aPL6CFQzV48Q7kNvgE3Yce6&_nc_ht=scontent.fktm8-1.fna&oh=00_AYAkN99FZB-s60tHaxQ6nftUke8YTLFWSwJyBQWCyNy7Eg&oe=66452EB0",
        genre: "Musician"
    },
    {
        name: "Alina Bhattarai",
        avatarSrc: "https://example.com/avatars/alina.jpg",
        genre: "Visual Artist"
    },
    {
        name: "Rajesh Hamal",
        avatarSrc: "https://example.com/avatars/rajesh.jpg",
        genre: "Actor"
    },
    {
        name: "Nisha Adhikari",
        avatarSrc: "https://example.com/avatars/nisha.jpg",
        occupation: "Actress"
    },
    {
        name: "Bikash Khatiwada",
        avatarSrc: "https://example.com/avatars/bikash.jpg",
        occupation: "Poet"
    },
    {
        name: "Ani Choying",
        avatarSrc: "https://example.com/avatars/ani.jpg",
        genre: "Singer"
    }
];

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = () => {};

  const handleFilterStatus = () => {};

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='List'
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Artist', href: paths.dashboard.artist.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.user.new}
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
                  rowCount={artists?.length}
                  numSelected={table.selected.length}
                />

                <TableBody>
                  {artists?.map((row: any) => (
                    <VenueTableRow key={row.id} row={row} />
                  ))}

                  <TableNoData notFound={artists?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={artists?.length}
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
