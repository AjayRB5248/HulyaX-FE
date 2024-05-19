'use client';
import withAuth from 'src/hoc/withAuth';
import { TourCreateView } from 'src/sections/tour/view';

function TourCreatePage() {
  return <TourCreateView />;
}

export default withAuth(TourCreatePage, ['superAdmin']);
