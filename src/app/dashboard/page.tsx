'use client';

import withAuth from 'src/hoc/withAuth';
// sections
import { OverviewBankingView } from 'src/sections/overview/booking/view';

function OverviewBookingPage() {
  return <OverviewBankingView />;
}

export default withAuth(OverviewBookingPage, ['superAdmin', 'companyAdmin']);
