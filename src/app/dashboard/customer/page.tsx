'use client';
import withAuth from 'src/hoc/withAuth';
import { CustomerListView } from 'src/sections/customers/view';

function CustomerListPage() {
  return <CustomerListView />;
}
export default withAuth(CustomerListPage, ['superAdmin','companyAdmin']);
