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
import { Icon } from '@iconify/react';
import { useRemoveUser } from 'src/api/users';
import VenueQuickEditForm from './venue-quick-edit-form';
import { Avatar } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
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
    id,
  } = row;
  const removeUserMutation = useRemoveUser();

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleDeleteUser = async () => {
    await removeUserMutation.mutateAsync(id).then(() => {
      confirm.onFalse();
    });
  };

  return (
    <>
      <TableRow hover selected={selected}>
       <Avatar alt={name} src={"https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/428606958_979593436857040_9093732891230991285_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=aPL6CFQzV48Q7kNvgE3Yce6&_nc_ht=scontent.fktm8-1.fna&oh=00_AYAkN99FZB-s60tHaxQ6nftUke8YTLFWSwJyBQWCyNy7Eg&oe=66452EB0"} sx={{ mr: 2 }} />
        <TableCell sx={{ whiteSpace: 'nowrap' }}>Sacar Adhikari</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>Musician</TableCell>

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
        currentUser={row}
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
            disabled={removeUserMutation.isLoading}
          >
            {removeUserMutation.isLoading ? 'Deleting' : 'Delete'}
          </Button>
        }
      />
    </>
  );
}
