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
}: any) {
  const {
      customer,
      purchasedTicket
  } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer?.name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer?.mobileNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{customer?.email}</TableCell>

        <TableCell
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
        </TableCell>

      </TableRow>
    </>
  );
}
