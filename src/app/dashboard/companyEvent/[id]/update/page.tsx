'use client';
import withAuth from 'src/hoc/withAuth';
import { CompanyEventUpdateView } from 'src/sections/companyEvents/view';

function CompanyTicketUpdatePage() {
  return <CompanyEventUpdateView />;
}

export default withAuth(CompanyTicketUpdatePage, [
  'superAdmin',
  'companyAdmin',
]);
