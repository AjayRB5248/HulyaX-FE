// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { IUserItem } from 'src/types/user';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
//
import VenueQuickEditForm from './venue-quick-edit-form';
import { IVenueItem } from 'src/types/venue';
import { useRemoveVenue } from 'src/api/venues';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IVenueItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function VenueTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  setSelectedUser,
}: any) {
  const {
    name,
    genre,
    artistProfile,
    _id,
  } = row;
  const removeVenueMutation = useRemoveVenue();

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleDeleteUser = async () => {
    await removeVenueMutation.mutateAsync(_id).then(() => {
      confirm.onFalse();
    });
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.venueName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.state?.stateName ?? 'Not Added Yet'}</TableCell>
        <TableCell align='right' sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title='Quick Edit' placement='top' arrow>
            <IconButton
              color={quickEdit.value ? 'inherit' : 'default'}
              onClick={quickEdit.onTrue}
            >
              <Iconify icon='solar:pen-bold' />
            </IconButton>
          </Tooltip>

          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={popover.onOpen}
          >
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>
      <VenueQuickEditForm
        currentVenue={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow='right-top'
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon='solar:trash-bin-trash-bold' />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            setSelectedUser(id);
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon='solar:pen-bold' />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title='Delete'
        content='Are you sure want to delete?'
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => handleDeleteUser()}
            disabled={removeVenueMutation.isLoading}
          >
            {removeVenueMutation.isLoading ? 'Deleting' : 'Delete'}
          </Button>
        }
      />
    </>
  );
}
