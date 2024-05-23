'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// _mock
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from 'src/_mock';
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
import BookingNewest from '../booking-newest';
import BookingDetails from '../booking-details';
import BookingAvailable from '../booking-available';
import BookingStatistics from '../booking-statistics';
import BookingTotalIncomes from '../booking-total-incomes';
import BookingWidgetSummary from '../booking-widget-summary';
import BookingCheckInWidgets from '../booking-check-in-widgets';
import BookingCustomerReviews from '../booking-customer-reviews';
import { useDashboardReports } from 'src/api/dashboard';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function OverviewBookingView() {
  const theme = useTheme();
  const {reports}= useDashboardReports();

  // const _bookingsOverview = [...Array(2)].map((_, index) => ({
  //   status: ['Availabe', 'Sold'][index],
  //   quantity: reports?.reportData?.availableTickets,
  //   // value: _mock.number.percent(index),
  // }));

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total Ticket Amount"
            total={reports?.reportData?.totalPriceInDollars}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Sold" total={reports?.reportData?.soldTickets} icon={<CheckInIllustration />} />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Sold in $" total={reports?.reportData?.totalSoldInDollars} icon={<CheckOutIllustration />} />
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
                    { x: 2016, y: 111 },
                    { x: 2017, y: 136 },
                    { x: 2018, y: 76 },
                    { x: 2019, y: 108 },
                    { x: 2020, y: 74 },
                    { x: 2021, y: 54 },
                    { x: 2022, y: 57 },
                    { x: 2023, y: 84 },
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
                    { label: 'Sold', percent: 72, total: reports?.reportData?.totalSoldInDollars },
                    { label: 'Pending for payment', percent: 64, total: reports?.reportData?.remaningToSellInDollars },
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
