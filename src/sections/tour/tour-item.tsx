// @mui
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// utils
import { fDate, fDateTime } from 'src/utils/format-time';
// types
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  event: any;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onAssignVenue: VoidFunction;
};

export default function TourItem({
  event,
  onView,
  onEdit,
  onDelete,
  onAssignVenue,
}: Props) {
  const popover = usePopover();
  const {
    _id,
    eventName,
    eventCategory,
    eventDescription,
    supportedStates,
    status,
    ticketTypes,
    artists,
    venues,
    eventImages,
    slug,
    createdAt,
    available,
    images,
  } = event;

  const renderImages = (
    <Stack
      spacing={0.5}
      direction='row'
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      {/* <Stack flexGrow={1} sx={{ position: 'relative' }}>
        <Image alt={eventImages[0]} src={eventImages[0]?.imageurl} sx={{ borderRadius: 1, height: 164, width: 1 }} />
      </Stack>
      {eventImages?.length>2 && <Stack spacing={0.5}>
        <Image alt={eventImages[1]} src={eventImages[1]?.imageurl} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
        <Image alt={eventImages[2]} src={eventImages[2]?.imageurl} ratio="1/1" sx={{ borderRadius: 1, width: 80 }} />
      </Stack>} */}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`Posted date: ${fDateTime(createdAt)}`}
      secondary={
        <Link
          component={RouterLink}
          href={paths.dashboard.tour.details(_id)}
          color='inherit'
        >
          {eventName}
        </Link>
      }
      primaryTypographyProps={{
        typography: 'caption',
        color: 'text.disabled',
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const venueNames = venues?.map((venue: any) => venue.city).join('-');
  const venuesDate = venues
    ?.map((venue: any) => `${fDate(venue.eventDate)}`)
    .join('-');

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton
        onClick={popover.onOpen}
        sx={{ position: 'absolute', bottom: 20, right: 8 }}
      >
        <Iconify icon='eva:more-vertical-fill' />
      </IconButton>

      {[
        {
          label: venueNames,
          icon: (
            <Iconify
              icon='mingcute:location-fill'
              sx={{ color: 'error.main' }}
            />
          ),
        },
        {
          label: venuesDate,
          icon: (
            <Iconify
              icon='solar:clock-circle-bold'
              sx={{ color: 'info.main' }}
            />
          ),
        },
        {
          label: eventCategory ? eventCategory : 'Event',
          icon: (
            <Iconify icon='tabler:category' sx={{ color: 'success.main' }} />
          ),
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction='row'
          alignItems='center'
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow='right-top'
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon='solar:eye-bold' />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onAssignVenue();
          }}
        >
          <Iconify icon='solar:eye-bold' />
          Asigin Venue
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon='solar:pen-bold' />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon='solar:trash-bin-trash-bold' />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
