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
import { useAssignedEvents } from 'src/api/superAdmin';
import { SplashScreen } from 'src/components/loading-screen';
import TourTicketSettingsForm from '../ticket-config';
import UpdateTourTicketSettingsForm from '../update-ticket-config';

// ----------------------------------------------------------------------

export default function CompanyEventTicketUpdateView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { eventList, loading} = useAssignedEvents(id)
  if (!eventList || eventList.length === 0) {
    return <SplashScreen />;
  }

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

     {eventList[0].ticketConfig.length > 0 ? <UpdateTourTicketSettingsForm currentEvent={eventList} /> : 
      <TourTicketSettingsForm currentTicket={eventList} />
    }

    </Container>
  );
}
