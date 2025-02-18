// @mui
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SxProps, Theme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination';

// ----------------------------------------------------------------------

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        {...other}
        sx={{
          borderTopColor: 'transparent',
        }}
      />
      
    </Box>
  );
}
