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

// ----------------------------------------------------------------------

const SPACING = 3;

export default function OverviewBookingView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total Booking"
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Sold" total={311000} icon={<CheckInIllustration />} />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary title="Canceled" total={124000} icon={<CheckOutIllustration />} />
        </Grid>

        <Grid container xs={12}>
          <Grid container xs={12} md={8}>
            <Grid xs={12} md={6}>
              <BookingTotalIncomes
                title="Total Incomes"
                total={18765}
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
              <BookingBooked title="Booked" data={_bookingsOverview} />
            </Grid>

            <Grid xs={12}>
              <BookingCheckInWidgets
                chart={{
                  series: [
                    { label: 'Sold', percent: 72, total: 38566 },
                    { label: 'Pending for payment', percent: 64, total: 18472 },
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
                  { label: 'Sold out', value: 120 },
                  { label: 'Available', value: 66 },
                ],
              }}
            />
          </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}
