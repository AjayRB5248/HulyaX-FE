'use client';
import withAuth from 'src/hoc/withAuth';
import { CompanyEventEditView } from 'src/sections/companyEvents/view';

function CompanyTicketEditPage() {
  return <CompanyEventEditView />;
}

export default withAuth(CompanyTicketEditPage, ['superAdmin', 'companyAdmin']);
