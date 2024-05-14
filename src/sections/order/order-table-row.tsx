// @mui
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
// utils
// types
// components
import moment from 'moment';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

export default function OrderTableRow({ row }: Props) {
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
        <TableCell>
          <Box
            // onClick={onViewRow}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {row?._id}
          </Box>
        </TableCell>

        <TableCell>{row?.eventData?.eventName}</TableCell>

        <TableCell>{moment(row?.bookedDate)?.format()}</TableCell>

        <TableCell>
          {row?.eventData?.artists
            ?.map((item: any) => item?.artistName)
            .join(', ')}
        </TableCell>
        <TableCell>
          {row?.eventData?.venues
            ?.map((item: any) => item?.venueName)
            .join(', ')}
        </TableCell>

        <TableCell>
          {
            <Label
              variant='soft'
              color={
                (row?.status === 'CONFIRMED' && 'success') ||
                (row?.status === 'PENDING' && 'warning') ||
                (row?.status === 'CANCELLED' && 'error') ||
                'default'
              }
            >
              {row?.status}
            </Label>
          }
        </TableCell>
      </TableRow>
    </>
  );
}
