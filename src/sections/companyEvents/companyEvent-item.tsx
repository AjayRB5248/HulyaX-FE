// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDate, fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
// types
import { ITourItem } from 'src/types/tour';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import moment from 'moment';

// ----------------------------------------------------------------------

type Props = {
  event: any;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onAssignVenue: VoidFunction;
  onAddTicketSettings:VoidFunction;
  onEditTicketSettings:VoidFunction
};

export default function CompanyEventItem({ event, onView, onEdit, onDelete,onAssignVenue,onAddTicketSettings,onEditTicketSettings }: Props) {
  const popover = usePopover();
  const {
    _id,
    eventName,
    eventCategory,
    eventDescription,
    status,
    ticketTypes,
    artists,
    venues,
    parentEvent,
    slug,
    createdAt,
    available,
    state,
  } = event;

  console.log({mabisha:event})

  const primaryImage = parentEvent?.images?.find((image:any) => image?.isPrimary);
  const renderImages = (
    <Stack
      spacing={0.5}
      direction='row'
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: 'relative' }}>
        {primaryImage && <Image alt={primaryImage._id ?? new Date().toString()} src={primaryImage?.imageurl} sx={{ borderRadius: 1, height: 164, width: 1 }} />}
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`Posted date: ${fDateTime(createdAt)}`}
      secondary={
        <Link component={RouterLink} href={paths.dashboard.companyEvents.details(_id)} color="inherit">
         {parentEvent?.eventName}
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

  const venueNames = venues?.map((venue:any) => venue.city).join('-');
  const venuesDate = venues?.map((venue:any) =>  `${fDate(venue.eventDate)}`).join('-');

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          label: state?.stateName,
          icon: <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />,
        },
        {
          label: venues?.[0]?.eventDate ? moment(venues[0]?.eventDate).format('MMMM D, h A') : '',
          icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main' }} />,
        },
        {
          label: eventCategory ? eventCategory : "Event",
          icon: <Iconify icon="tabler:category" sx={{ color: 'success.main' }} />,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
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
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
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
            onAddTicketSettings();
          }}
        >
          <Iconify icon='solar:eye-bold' />
          Add Ticket 
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onEditTicketSettings();
          }}
        >
          <Iconify icon='solar:eye-bold' />
          Edit Ticket 
        </MenuItem>
        

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
