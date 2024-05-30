// @mui
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// types
// components
import { LoadingButton } from '@mui/lab';
import { Input } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

type TFilter = {
  venueName: string;
  artist: string;
  eventDate: Date;
};

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  filters: TFilter;
  setFilters: any;
  handleFilter?: VoidFunction;
  handelFilterReset?: VoidFunction;
};

export default function TourFilters({
  open,
  onOpen,
  onClose,
  filters,
  setFilters,
  handleFilter,
  handelFilterReset,
}: Props) {
  const renderHead = (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant='h6' sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <IconButton onClick={onClose}>
        <Iconify icon='mingcute:close-line' />
      </IconButton>
    </Stack>
  );

  const handelFieldChange = (e: any) => {
    setFilters((prev: TFilter) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderDateRange = (
    <Stack>
      <Typography variant='subtitle2' sx={{ mb: 1.5 }}>
        Events Date
      </Typography>
      <Stack spacing={2.5}>
        <DatePicker
          label='Date'
          value={filters.eventDate}
          onChange={(e) =>
            handelFieldChange({ target: { value: e, name: 'eventDate' } })
          }
        />
      </Stack>
    </Stack>
  );

  const renderVenueField = (
    <Stack>
      <Typography variant='subtitle2' sx={{ mb: 1.5 }}>
        Venue Name
      </Typography>
      <Stack spacing={2.5}>
        <Input
          type='text'
          name='venueName'
          value={filters?.venueName}
          onChange={handelFieldChange}
        />
      </Stack>
    </Stack>
  );
  const renderArtistField = (
    <Stack>
      <Typography variant='subtitle2' sx={{ mb: 1.5 }}>
        Artist Name
      </Typography>
      <Stack spacing={2.5}>
        <Input
          type='text'
          name='artist'
          value={filters?.artist}
          onChange={handelFieldChange}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color='inherit'
        endIcon={
          <Badge color='error' variant='dot' invisible={true}>
            <Iconify icon='ic:round-filter-list' />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderVenueField}
            {renderArtistField}
            {renderDateRange}
          </Stack>
        </Scrollbar>

        <Divider />
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ py: 2, pr: 1, pl: 2.5 }}
        >
          <LoadingButton onClick={handelFilterReset} variant='outlined'>
            Reset Filter
          </LoadingButton>
          <LoadingButton onClick={handleFilter} variant='contained'>
            Apply Filter
          </LoadingButton>
        </Stack>
      </Drawer>
    </>
  );
}
