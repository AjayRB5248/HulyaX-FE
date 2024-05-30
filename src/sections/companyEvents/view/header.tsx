'use client';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
// types
//
import { Button, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { RouterLink } from 'src/routes/components';

type MenuOptions = {
  title: string;
  onClick: () => void;
  show: boolean;
  icon?: string;
}[];

const HeaderActions = ({ campaign }: any) => {
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const params = useParams();

  const options: MenuOptions = [
    {
      title: 'Add Ticket Settings',
      onClick: () => {
        router.push(paths.dashboard.companyEvents.edit(params?.id as any));
      },
      icon: 'tabler:edit',
      show: true,
    },
    {
        title: 'Update Ticket Settings',
        onClick: () => {
          router.push(paths.dashboard.companyEvents.update(params?.id as any));
        },
        icon: 'tabler:edit',
        show: true,
      },
   
  ];

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event?.currentTarget);
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={
          isOpen ? <Iconify icon="mingcute:up-line" /> : <Iconify icon="mingcute:down-line" />
        }
      >
        Ticket Options
      </Button>
      <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
        {options
          ?.filter((o) => o?.show)
          ?.map((option) => (
            <MenuItem key={option?.title} onClick={option?.onClick}>
              <ListItemIcon>{option?.icon && <Iconify icon={option?.icon} />}</ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                {option?.title}
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </Stack>
  );
};

export default HeaderActions;
