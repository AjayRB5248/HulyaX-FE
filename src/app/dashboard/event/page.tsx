'use client';
import withAuth from 'src/hoc/withAuth';
import { TourListView } from 'src/sections/tour/view';

function TourListPage() {
  return <TourListView />;
}

export default withAuth(TourListPage, ['superAdmin', 'companyAdmin']);
