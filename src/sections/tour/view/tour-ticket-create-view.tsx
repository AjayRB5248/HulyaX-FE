'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _tours } from 'src/_mock';
// components
import { useParams } from 'src/routes/hook';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { useEvent } from 'src/api/events';
import { useAssignedEvents } from 'src/api/superAdmin';
import TourTicketSettingsForm from '../ticket-config';

// ----------------------------------------------------------------------

export default function TourTicketCreateView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { eventList, loading} = useAssignedEvents(id)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Event Ticket Settings"
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
            name: 'Ticket Settings',
          }
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TourTicketSettingsForm currentTicket={eventList} />

    </Container>
  );
}
