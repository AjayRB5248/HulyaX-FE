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
import { useEvent } from 'src/api/events';

// ----------------------------------------------------------------------

export default function CompanyEventTicketEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { event, isLoading} = useEvent(id)

  const currentTicket  = {
    ticketTypes: [
      {
        companyId:"65b6330e57b8f91495bb610f",
        venueId: "6644f20a16f4742cffeacbe2",
        type: 'VIP',
        price: '200',
        totalSeats: '150',
      },
      {
        companyId:"65b6330e57b8f91495bb610f",
        venueId: '6644f20a16f4742cffeacbe2',
        type: 'VIP',
        price: '200',
        totalSeats: '150',
      },
    ],
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
            name: 'Company Events',
            href: paths.dashboard.tour.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <TicketSettingsForm currentTicket= {currentTicket} /> */}
      <TicketSettingsForm />

    </Container>
  );
}
