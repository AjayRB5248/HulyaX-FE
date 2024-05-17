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
import { Avatar } from '@mui/material';
import ArtistQuickEditForm from './artist-quick-edit-form';
import { useRemoveArtist } from 'src/api/artists';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ArtistTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  setSelectedUser,
}: any) {
  const {
    artistName,
    category,
    images,
    _id,
  } = row;

  const removeArtistMutation = useRemoveArtist();

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleDeleteUser = async () => {
    await removeArtistMutation.mutateAsync(_id).then(() => {
      confirm.onFalse();
    });
  };

  return (
    <>
      <TableRow hover selected={selected}>
       <Avatar alt={artistName} src={images[0]?.imageurl} sx={{ ml:4,mt:2 }} />
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{artistName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{category}</TableCell>

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

      <ArtistQuickEditForm
        currentArtist={row}
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
            setSelectedUser(_id);
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
            disabled={removeArtistMutation.isLoading}
          >
            {removeArtistMutation.isLoading ? 'Deleting' : 'Delete'}
          </Button>
        }
      />
    </>
  );
}
