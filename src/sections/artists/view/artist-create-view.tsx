'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ArtistNewEditForm from '../artist-new-edit-form';

// ----------------------------------------------------------------------

export default function ArtistCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new artist"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Artist',
            href: paths.dashboard.artist.list,
          },
          { name: 'New Artist' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ArtistNewEditForm />
    </Container>
  );
}
