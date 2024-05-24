'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import { _bookings, _bookingNew, _bookingReview } from 'src/_mock';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from 'src/assets/illustrations';
// components
import { useSettingsContext } from 'src/components/settings';
//
import BookingBooked from '../booking-booked';
import BookingAvailable from '../booking-available';
import BookingTotalIncomes from '../booking-total-incomes';
import BookingWidgetSummary from '../booking-widget-summary';
import BookingCheckInWidgets from '../booking-check-in-widgets';
import { useDashboardReports } from 'src/api/dashboard';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function OverviewBookingView() {
  const theme = useTheme();
  const {reports}= useDashboardReports();

  const settings = useSettingsContext();
  const totalAmount = reports?.reportData?.totalPriceInDollars
  const totalSoldInDollars = reports?.reportData?.totalSoldInDollars ?? 0;
  const remainingToSellInDollars = reports?.reportData?.remaningToSellInDollars ?? 0;
  const soldPercent = totalAmount ? ((totalSoldInDollars / totalAmount) * 100).toFixed(2) : 0;
  const remainingPercent = totalAmount ? ((remainingToSellInDollars / totalAmount) * 100).toFixed(2) : 0;
  const soldTickets = reports?.reportData?.soldTickets ?? 0;
  const availableTickets = reports?.reportData?.availableTickets ?? 0;
  const totalTickets = soldTickets + availableTickets;
  const soldTicketsPercent:any = totalTickets ? ((soldTickets / totalTickets) * 100).toFixed(2) : 0;
  const availableTicketsPercent:any = totalTickets ? ((availableTickets / totalTickets) * 100).toFixed(2) : 0;

  const _bookingsOverview = [
    {
      status: 'Sold',
      quantity: soldTickets,
      value: parseFloat(soldTicketsPercent)
   },
    {
        status: 'Available',
        quantity: availableTickets,
        value: parseFloat(availableTicketsPercent)
    },

];
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total Ticket Amount"
            total={reports?.reportData?.totalPriceInDollars}
            icon={<BookingIllustration />}
            dollar={true}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Ticket Sold" dollar={false} total={reports?.reportData?.soldTickets} icon={<CheckInIllustration />} />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Sold Ticket Amount" dollar={true} total={reports?.reportData?.totalSoldInDollars} icon={<CheckOutIllustration />} />
        </Grid>

        <Grid container xs={12}>
          <Grid container xs={12} md={8}>
            <Grid xs={12} md={6}>
              <BookingTotalIncomes
                title="Total Incomes"
                total={reports?.reportData?.totalSoldInDollars}
                percent={2.6}
                chart={{
                  series: [
                    { x: 2016, y: 84 },
                    { x: 2017, y: 57 },
                    { x: 2018, y: 54 },
                    { x: 2019, y: 74 },
                    { x: 2020, y: 108 },
                    { x: 2021, y: 76 },
                    { x: 2022, y: 136 },
                    { x: 2023, y: 111 },
                  ],
                }}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <BookingBooked title="Ticket Status" data={_bookingsOverview} />
            </Grid>

            <Grid xs={12}>
              <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Sold', percent: soldPercent, total: reports?.reportData?.totalSoldInDollars },
                    { label: 'Pending for payment', percent: remainingPercent, total: reports?.reportData?.remaningToSellInDollars },
                  ],
                }}
              />
            </Grid>


          </Grid>

          <Grid xs={12} md={4}>
            <BookingAvailable
              title="Tickets Available"
              chart={{
                series: [
                  { label: 'Sold out', value: reports?.reportData?.soldTickets },
                  { label: 'Available', value: reports?.reportData?.availableTickets },
                ],
              }}
            />
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}
