'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ArtistNewEditForm from '../artist-new-edit-form';
import { useArtists } from 'src/api/artists';

// ----------------------------------------------------------------------

export default function ArtistEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Artist',
            href: paths.dashboard.artist.list,
          },
          { name:'New Artist' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ArtistNewEditForm  />
    </Container>
  );
}
