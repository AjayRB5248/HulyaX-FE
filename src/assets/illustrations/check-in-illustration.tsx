import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

function TicketSoldIllustration({ ...other }: BoxProps) {
  const theme = useTheme();

  const PRIMARY_LIGHTER = theme.palette.primary.lighter;
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        fill="url(#a)"
        d="M100 10c49.7 0 90 40.3 90 90s-40.3 90-90 90S10 149.7 10 100 50.3 10 100 10z"
      />

      <path
        fill="url(#b)"
        d="M100 30c38.7 0 70 31.3 70 70s-31.3 70-70 70-70-31.3-70-70 31.3-70 70-70z"
      />

      <path
        fill={PRIMARY_DARK}
        d="M85 85h30v30H85V85z"
      />

      <path
        fill={PRIMARY_MAIN}
        d="M100 50a50 50 0 1 1-50 50 50 50 0 0 1 50-50z"
      />

      <path
        fill={PRIMARY_LIGHTER}
        d="M100 40a60 60 0 1 0 60 60 60 60 0 0 0-60-60z"
      />

      <path
        fill={PRIMARY_DARKER}
        d="M100 35a65 65 0 1 1-65 65 65 65 0 0 1 65-65z"
      />

      {/* Ticket Icon */}
      <path
        fill={PRIMARY_MAIN}
        d="M75 90h50v20H75z"
      />
      <path
        fill={PRIMARY_LIGHTER}
        d="M85 95v10h30V95H85zm5 2h5v6h-5v-6zm10 0h5v6h-5v-6zm10 0h5v6h-5v-6z"
      />

      <defs>
        <linearGradient
          id="a"
          x1="100"
          x2="100"
          y1="10"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>

        <linearGradient
          id="b"
          x1="100"
          x2="100"
          y1="30"
          y2="170"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>
    </Box>
  );
}

export default memo(TicketSoldIllustration);
