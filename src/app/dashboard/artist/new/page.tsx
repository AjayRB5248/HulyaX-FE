'use client';
import withAuth from 'src/hoc/withAuth';
import { ArtistCreateView } from 'src/sections/artists/view';

function ArtistCreatePage() {
  return <ArtistCreateView />;
}

export default withAuth(ArtistCreatePage, ['superAdmin']);
