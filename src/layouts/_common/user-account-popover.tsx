import { m } from 'framer-motion';
// @mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// routes
import { useRouter } from 'src/routes/hook';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// auth
// components
import { useLogout } from 'src/api/auth';
import { useAuth } from 'src/auth/context/users/auth-context';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useSnackbar } from 'src/components/snackbar';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'My Profile',
    linkTo: '/user/profile',
  },

  {
    label: 'View Purchased Tickets',
    linkTo: '/user/profile?tab=tickets',
  },
];

// ----------------------------------------------------------------------

export default function UserAccountPopover() {
  const { user, refreshToken, setUser } = useAuth();

  const router = useRouter();

  const { user: mockedUser } = useMockedUser();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const logoutMutation = useLogout();

  const logOut = async () => {
    await logoutMutation.mutateAsync({
      refreshToken,
    });
    // router.push("/");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      popover.onClose();
      // router.replace("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    router.replace(path);
    popover.onClose();
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap='tap'
        whileHover='hover'
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.profilePicture}
          alt={user?.name?.split(' ')[0]}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
          className='avatar-profile'
        />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user?.name}
          </Typography>

          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}

          {(user?.role === 'superAdmin' || user?.role === 'companyAdmin') && (
            <MenuItem
              key={'Dashboard'}
              onClick={() => handleClickItem(PATH_AFTER_LOGIN)}
            >
              Dashboard
            </MenuItem>
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
          <i className='fas fa-sign-out-alt ml-2'></i>
        </MenuItem>
      </CustomPopover>
    </>
  );
}
