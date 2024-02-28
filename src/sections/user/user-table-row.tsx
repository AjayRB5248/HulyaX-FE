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
import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  setSelectedUser,
}: any) {
  const {
    name,
    role,
    status,
    email,
    mobileNumber,
    isEmailVerified,
    isNumberVerified,
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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{mobileNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {isEmailVerified ? (
            <Icon icon='material-symbols:verified' />
          ) : (
            <Icon icon='carbon:close-filled' />
          )}
        </TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {isNumberVerified ? (
            <Icon icon='material-symbols:verified' />
          ) : (
            <Icon icon='carbon:close-filled' />
          )}
        </TableCell>

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

      <UserQuickEditForm
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
