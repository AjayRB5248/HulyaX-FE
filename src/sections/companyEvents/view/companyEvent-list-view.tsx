'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useEvents } from 'src/api/events';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import CompanyEventList from '../companyEvent-list';

const defaultFilter = {
  venueName: '',
  artist: '',
  eventDate: '',
};
export default function TourListView() {
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilter);
  const { events, loading, error, refetch } = useEvents(filters);

  const openFilters = useBoolean();

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent='space-between'
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <div />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='List'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Company Event',
            href: paths.dashboard.tour.root,
          },
          { name: 'List' },
        ]}

        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}
      </Stack>

      {/* {<EmptyContent title='No Data' filled sx={{ py: 10 }} />} */}
      {loading ? <LoadingScreen /> : <CompanyEventList />}
    </Container>
  );
}
