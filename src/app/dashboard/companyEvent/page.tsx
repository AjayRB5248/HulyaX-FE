'use client';

import withAuth from 'src/hoc/withAuth';
import { CompanyEventListView } from 'src/sections/companyEvents/view';

function CompanyEventListPage() {
  return <CompanyEventListView />;
}
export default withAuth(CompanyEventListPage, ['superAdmin', 'companyAdmin']);
