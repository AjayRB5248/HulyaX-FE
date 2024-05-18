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
import TicketSettingsForm from '../ticket-config';
import UpdateTicketSettingsForm from "../update-ticket-config"
import { useAssignedEvents } from 'src/api/superAdmin';

// ----------------------------------------------------------------------

export default function CompanyEventTicketUpdateView() {
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
            name: 'Company Events',
            href: paths.dashboard.companyEvents.root,
          },
          {
            name: 'Ticket Settings',
          }
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

     {eventList[0].ticketConfig.length > 0 ? <UpdateTicketSettingsForm currentEvent={eventList} /> : 
      <TicketSettingsForm currentEvent={eventList} />
    }

    </Container>
  );
}
