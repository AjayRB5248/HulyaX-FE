'use client';

import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _tours, TOUR_PUBLISH_OPTIONS, TOUR_DETAILS_TABS } from 'src/_mock';
// components
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
//
import TourDetailsToolbar from '../tour-details-toolbar';
import TourDetailsContent from '../tour-details-content';
import TourDetailsBookers from '../tour-details-bookers';
import { useEvent, useEvents } from 'src/api/events';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { Button, Stack } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import HeaderActions from './header-action';

// ----------------------------------------------------------------------

export default function TourDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const {event,isLoading} = useEvent(id)


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
        heading="Event Detail"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Events',
            href: paths.dashboard.tour.root,
          },
          {
            name: 'About Event',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={<HeaderActions />}
      />

    <TourDetailsContent event={event} isLoading={isLoading} />

    </Container>
  );
}
