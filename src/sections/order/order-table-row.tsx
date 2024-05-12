import { format } from "date-fns";
// @mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// utils
import { fCurrency } from "src/utils/format-number";
// types
import { IOrderItem } from "src/types/order";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { Tooltip } from "@mui/material";
import moment from "moment";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }: Props) {
  const { items, status, orderNumber, createdAt, customer, totalQuantity, subTotal } = row;

  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  // const renderPrimary = (
  //   <TableRow hover selected={selected}>
  //     <TableCell padding="checkbox">
  //       <Checkbox checked={selected} onClick={onSelectRow} />
  //     </TableCell>

  //     <TableCell>
  //       <Box
  //         onClick={onViewRow}
  //         sx={{
  //           cursor: "pointer",
  //           "&:hover": {
  //             textDecoration: "underline",
  //           },
  //         }}
  //       >
  //         {row?._id}
  //       </Box>
  //     </TableCell>


  //     <TableCell>
  //       <ListItemText
  //         primary={format(new Date(row?.bookedDate), "dd MMM yyyy")}
  //         secondary={format(new Date(new Date(row?.bookedDate), "p")}
  //         primaryTypographyProps={{ typography: "body2", noWrap: true }}
  //         secondaryTypographyProps={{
  //           mt: 0.5,
  //           component: "span",
  //           typography: "caption",
  //         }}
  //       />
  //     </TableCell>



  //     <TableCell>
  //       <Label
  //         variant="soft"
  //         color={
  //           (row?.status === "completed" && "success") ||
  //           (row?.status === "pending" && "warning") ||
  //           (row?.status === "cancelled" && "error") ||
  //           "default"
  //         }
  //       >
  //         {row?.status}
  //       </Label>
  //     </TableCell>
  //     <TableCell>
  //       <Label
  //         variant="soft"
  //         color={
  //           (row?.status === "completed" && "success") ||
  //           (row?.status === "pending" && "warning") ||
  //           (row?.status === "cancelled" && "error") ||
  //           "default"
  //         }
  //       >
  //         {row?.status}
  //       </Label>
  //     </TableCell>

    
  //   </TableRow>
  // );



  return (
    <>
     <TableRow>
     <TableCell></TableCell>
     
     <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {row?._id}
        </Box>
      </TableCell>

     <TableCell>
        {row?.eventData?.eventName}
     </TableCell>

     <TableCell>
        {moment(row?.bookedDate)?.format()}
     </TableCell>

     <TableCell>
        {row?.eventData?.artists?.join(',')}
     </TableCell>

     <TableCell>
        {row?.eventData?.venues}
     </TableCell>

     <TableCell>
        {row?.status}
     </TableCell>

     </TableRow>

    </>
  );
}
