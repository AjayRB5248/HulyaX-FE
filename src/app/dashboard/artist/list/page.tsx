'use client';

import withAuth from 'src/hoc/withAuth';
import { ArtistListView } from 'src/sections/artists/view';

function ArtistListPage() {
  return <ArtistListView />;
}
export default withAuth(ArtistListPage, ['superAdmin']);
